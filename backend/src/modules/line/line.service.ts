import { Injectable } from '@nestjs/common';
import { WebhookEvent, TextEventMessage, MessageEvent } from '@line/bot-sdk';
import { LineClient } from './line.client';
import { MessageRouter } from '../chatbot/router/message.router';
import { ConversationService } from '../chatbot/services/conversation.service';

@Injectable()
export class LineService {
    constructor(
        private readonly lineClient: LineClient,
        private readonly messageRouter: MessageRouter,
        private readonly conversationService: ConversationService,
    ) { }

    async handleEvent(event: WebhookEvent, channelId: string): Promise<void> {
        if (event.type !== 'message' || event.message.type !== 'text') {
            return;
        }

        const { replyToken } = event;
        const { text } = event.message as TextEventMessage;
        const userId = event.source.userId;

        if (!userId) {
            return;
        }

        // 1. Get Conversation State
        const context = await this.conversationService.getContext(userId, channelId);

        // 2. Save user message to database
        await this.conversationService.saveMessage(userId, text, 'user');

        // 3. Route to corresponding handler
        const responseText = await this.messageRouter.route(text, context);

        // 4. Save AI/bot response
        await this.conversationService.saveMessage(userId, responseText, 'assistant');

        // 5. Reply back to LINE
        await this.lineClient.replyMessage(replyToken, responseText);
    }
}
