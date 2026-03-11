export declare class User {
    id: string;
    lineUserId: string;
    lineOaId: string;
    state: string;
    screeningStep: string;
    screeningScore: number;
    lastMessage: string;
    createdAt: Date;
    updatedAt: Date;
    static uniqueKey: string[];
}
