import { Repository } from 'typeorm';
import { UserContext } from '../../../shared/types';
import { User } from '../entities/user.entity';
import { Conversation } from '../entities/conversation.entity';
export declare class ConversationService {
    private readonly userRepository;
    private readonly conversationRepository;
    private readonly logger;
    constructor(userRepository: Repository<User>, conversationRepository: Repository<Conversation>);
    getContext(lineUserId: string, lineOaId: string): Promise<UserContext>;
    updateContext(userId: string, updates: Partial<UserContext>): Promise<void>;
    saveMessage(userId: string, message: string, role: 'user' | 'assistant' | 'system'): Promise<void>;
}
