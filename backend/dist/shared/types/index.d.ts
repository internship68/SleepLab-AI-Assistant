export declare enum ConversationState {
    START = "START",
    SCREENING_Q1 = "SCREENING_Q1",
    SCREENING_Q2 = "SCREENING_Q2",
    SCREENING_Q3 = "SCREENING_Q3",
    FAQ = "FAQ",
    CONTACT_STAFF = "CONTACT_STAFF"
}
export interface UserContext {
    userId: string;
    lineOaId: string;
    state: ConversationState;
    screeningStep?: string;
    lastMessage?: string;
}
export interface SearchContext {
    content: string;
    source: string;
}
