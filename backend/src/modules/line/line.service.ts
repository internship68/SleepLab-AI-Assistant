import { Injectable, Logger } from '@nestjs/common';
import { WebhookEvent, TextEventMessage, MessageEvent } from '@line/bot-sdk';
import { LineClient } from './line.client';
import { MessageRouter } from '../chatbot/router/message.router';
import { ConversationService } from '../chatbot/services/conversation.service';

@Injectable()
export class LineService {
    private readonly logger = new Logger(LineService.name);

    constructor(
        private readonly lineClient: LineClient,
        private readonly messageRouter: MessageRouter,
        private readonly conversationService: ConversationService,
    ) { }

    async handleEvent(event: WebhookEvent, channelId: string): Promise<void> {
        if (event.type !== 'message' || event.message.type !== 'text') {
            this.logger.debug(`[LINE] Skip event: type=${event.type}, msgType=${(event as any).message?.type ?? 'N/A'}`);
            return;
        }

        const { replyToken } = event;
        const { text } = event.message as TextEventMessage;
        const userId = event.source.userId;

        if (!userId) {
            this.logger.warn(`[LINE] No userId in event`);
            return;
        }

        this.logger.log(`[LINE] Processing | lineUserId=${userId} | channelId=${channelId} | text="${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);

        // 1. Get Conversation State
        const context = await this.conversationService.getContext(userId, channelId);
        this.logger.log(`[LINE] Context | state=${context.state} | screeningScore=${context.screeningScore ?? 0}`);

        // 2. Save user message
        await this.conversationService.saveMessage(context.userId, text, 'user');

        // 3. Route to handler
        const responseText = await this.messageRouter.route(text, context);
        this.logger.log(`[LINE] Response length=${responseText?.length ?? 0} chars`);

        // 4. Save assistant response
        await this.conversationService.saveMessage(context.userId, responseText, 'assistant');

        // 5. Reply to LINE
        await this.lineClient.replyMessage(replyToken, responseText);
        this.logger.log(`[LINE] Reply sent ✓`);
    }
}
