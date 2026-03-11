import { UserContext } from '../../../shared/types';
import { ConversationService } from './conversation.service';
export declare class ScreeningService {
    private readonly conversationService;
    constructor(conversationService: ConversationService);
    start(context: UserContext): Promise<string>;
    process(message: string, context: UserContext): Promise<string>;
    private question1;
    private question2;
    private question3;
    private result;
}
