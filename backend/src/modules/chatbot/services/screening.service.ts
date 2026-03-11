import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserContext, ConversationState, ReplyContent } from '../../../shared/types';
import { ConversationService } from './conversation.service';
import { GoogleSheetsService } from './google-sheets.service';
import { createScreeningResultFlex } from '../../line/flex-templates';
import { getScreeningMessages } from '../../../shared/constants/messages';

/** ตรวจว่าเป็นคำตอบ "ใช่/มี" — ต้องตรวจ "ไม่ใช่/ไม่มี" ก่อน เพราะ contains จะ match ผิด */
function isYesAnswer(message: string): boolean {
    const m = message.trim();
    if (m.includes('ไม่ใช่') || m.includes('ไม่มี') || /^no$/i.test(m)) return false;
    if (m.includes('ใช่') || m.includes('มี') || /^yes$/i.test(m)) return true;
    return false;
}

@Injectable()
export class ScreeningService {
    constructor(
        private readonly conversationService: ConversationService,
        private readonly configService: ConfigService,
        private readonly googleSheets: GoogleSheetsService,
    ) { }

    async start(context: UserContext): Promise<ReplyContent> {
        await this.conversationService.updateContext(context.userId, {
            state: ConversationState.SCREENING_Q1,
            screeningScore: 0,
        });
        return this.question1();
    }

    async process(message: string, context: UserContext): Promise<ReplyContent> {
        const isYes = isYesAnswer(message);
        const score = (context.screeningScore ?? 0) + (isYes ? 1 : 0);

        switch (context.state) {
            case ConversationState.SCREENING_Q1:
                await this.conversationService.updateContext(context.userId, {
                    state: ConversationState.SCREENING_Q2,
                    screeningScore: score,
                });
                return this.question2();

            case ConversationState.SCREENING_Q2:
                await this.conversationService.updateContext(context.userId, {
                    state: ConversationState.SCREENING_Q3,
                    screeningScore: score,
                });
                return this.question3();

            case ConversationState.SCREENING_Q3:
                await this.conversationService.updateContext(context.userId, {
                    state: ConversationState.SCREENING_DONE,
                    screeningScore: score,
                });
                return await this.result(score, context);

            default:
                // Re-start screening if called from wrong state
                return this.start(context);
        }
    }

    // ─── Questions ────────────────────────────────────────
    private getMessages() {
        const botName = this.configService.get<string>('chatbot.botName') ?? 'MOONi';
        return getScreeningMessages(botName);
    }

    private question1(): string {
        return this.getMessages().q1;
    }

    private question2(): string {
        return this.getMessages().q2;
    }

    private question3(): string {
        return this.getMessages().q3;
    }

    // ─── Result ───────────────────────────────────────────
    private async result(score: number, context: UserContext): Promise<ReplyContent> {
        const msgs = this.getMessages();
        const contactKey = this.configService.get<string>('chatbot.contactMenuKey') ?? 'E';
        const articleUrl = this.configService.get<string>('chatbot.sleepHygieneArticleUrl') ?? '';
        const isHighRisk = score >= 2;
        const resultType = isHighRisk ? 'High Risk' : 'Low Risk';
        const recommendation = isHighRisk ? msgs.highRisk : msgs.lowRisk;

        this.googleSheets.logScreeningResult(
            context,
            resultType,
            score,
            recommendation.replace(/\n/g, ' ').slice(0, 500),
        ).catch(() => { /* ignore */ });

        if (isHighRisk) {
            return createScreeningResultFlex(true, msgs.highRisk, contactKey);
        }
        return createScreeningResultFlex(false, msgs.lowRisk, contactKey, {
            sleepHygieneArticleUrl: articleUrl || undefined,
        });
    }
}
