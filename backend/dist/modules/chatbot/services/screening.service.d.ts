import { UserContext } from '../../../shared/types';
import { ConversationService } from './conversation.service';
export declare class ScreeningService {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    process(message: string, context: UserContext): Promise<string>;
}
