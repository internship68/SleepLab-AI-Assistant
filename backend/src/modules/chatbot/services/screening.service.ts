import { Injectable } from '@nestjs/common';
import { UserContext, ConversationState } from '../../../shared/types';
import { ConversationService } from './conversation.service';

const YES_KEYWORDS = ['ใช่', 'yes', 'มี', 'ใช', 'ค่ะ', 'ครับ', 'a', 'A'];
const NO_KEYWORDS = ['ไม่ใช่', 'no', 'ไม่มี', 'ไม่', 'b', 'B'];

@Injectable()
export class ScreeningService {
    constructor(private readonly conversationService: ConversationService) { }

    async start(context: UserContext): Promise<string> {
        await this.conversationService.updateContext(context.userId, {
            state: ConversationState.SCREENING_Q1,
            screeningScore: 0,
        });
        return this.question1();
    }

    async process(message: string, context: UserContext): Promise<string> {
        const isYes = YES_KEYWORDS.some(k => message.includes(k));
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
                return this.result(score);

            default:
                // Re-start screening if called from wrong state
                return this.start(context);
        }
    }

    // ─── Questions ────────────────────────────────────────
    private question1(): string {
        return `การหมั่นสังเกตการนอน คือจุดเริ่มต้นของสุขภาพที่ดีค่ะ 🛌\n\nเพื่อให้ MOONi ประเมินได้แม่นยำ ขออนุญาตสอบถามอาการสั้นๆ 3 ข้อนะคะ\n\n1️⃣ คุณนอนกรนเสียงดัง (จนรบกวนคนข้างๆ) หรือมีเสียงเงียบไปพักหนึ่งแล้วตามด้วยเสียงเฮือกเหมือนสำลัก ใช่หรือไม่คะ?\n\n[ ใช่ ] / [ ไม่ใช่ ]`;
    }

    private question2(): string {
        return `2️⃣ ตื่นเช้ามาแล้วรู้สึกไม่สดชื่น ปวดหัว มึนงง หรืออ่อนเพลียมากในตอนกลางวัน ทั้งที่ชั่วโมงการนอนน่าจะพอ?\n\n[ ใช่ ] / [ ไม่ใช่ ]`;
    }

    private question3(): string {
        return `3️⃣ มีโรคประจำตัว เช่น ความดันโลหิตสูง เบาหวาน หรือโรคหัวใจ ร่วมด้วยหรือไม่คะ?\n\n[ มี ] / [ ไม่มี ]`;
    }

    // ─── Result ───────────────────────────────────────────
    private result(score: number): string {
        if (score >= 2) {
            return `⚠️ ผลการประเมินเบื้องต้น:\n\nคุณมีความเสี่ยง 'ระดับสูง' ที่จะมีภาวะหยุดหายใจขณะหลับ (OSA) ค่ะ อาการเหล่านี้อาจส่งผลให้ระดับออกซิเจนในเลือดลดลงและกระทบต่อหัวใจได้ในระยะยาว\n\nMOONi แนะนำให้ทำการตรวจการนอนหลับ (Sleep Test) เพื่อให้แพทย์วินิจฉัยอย่างละเอียดนะคะ สนใจดูรายละเอียดแพ็กเกจไหมคะ?\n\n[ ดูแพ็กเกจ Sleep Test ] / [ ติดต่อเจ้าหน้าที่ ]`;
        }
        return `✅ ผลการประเมินเบื้องต้น:\n\nความเสี่ยงยังอยู่ในระดับ 'ทั่วไป' ค่ะ แต่อาการเพลียอาจเกิดจากคุณภาพการนอนที่ไม่ดี (Sleep Quality)\n\nMOONi มีบทความแนะนำเรื่อง 'Sleep Hygiene: 10 เคล็ดลับจัดห้องนอนให้หลับลึก' มาฝาก ลองนำไปปรับใช้ดูนะคะ 😊\n\nหากมีคำถามเพิ่มเติม พิมพ์ถามได้เลยนะคะ`;
    }
}
