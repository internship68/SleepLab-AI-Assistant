import { WebhookEvent } from '@line/bot-sdk';
import { LineClient } from './line.client';
import { MessageRouter } from '../chatbot/router/message.router';
import { ConversationService } from '../chatbot/services/conversation.service';
export declare class LineService {
    private readonly lineClient;
    private readonly messageRouter;
    private readonly conversationService;
    constructor(lineClient: LineClient, messageRouter: MessageRouter, conversationService: ConversationService);
    handleEvent(event: WebhookEvent, channelId: string): Promise<void>;
}
