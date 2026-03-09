import { UserContext } from '../../../shared/types';
export declare class ConversationService {
    private readonly mockDb;
    getContext(userId: string, lineOaId: string): Promise<UserContext>;
    updateContext(userId: string, updates: Partial<UserContext>): Promise<void>;
    saveMessage(userId: string, message: string, role: 'user' | 'assistant'): Promise<void>;
}
