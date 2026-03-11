import { User } from './user.entity';
export declare class Conversation {
    id: string;
    userId: string;
    user: User;
    message: string;
    role: 'user' | 'assistant' | 'system';
    timestamp: Date;
}
