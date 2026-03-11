export declare enum ConversationState {
    START = "START",
    SCREENING_Q1 = "SCREENING_Q1",
    SCREENING_Q2 = "SCREENING_Q2",
    SCREENING_Q3 = "SCREENING_Q3",
    SCREENING_DONE = "SCREENING_DONE",
    FAQ = "FAQ",
    SLEEP_LAB = "SLEEP_LAB",
    CPAP = "CPAP",
    ELDERLY = "ELDERLY",
    CONTACT_STAFF = "CONTACT_STAFF"
}
export interface UserContext {
    userId: string;
    lineUserId: string;
    lineOaId: string;
    state: ConversationState;
    screeningStep?: string;
    screeningScore?: number;
    lastMessage?: string;
}
export interface SearchContext {
    content: string;
    source: string;
}
export interface OAConfig {
    lineOaId: string;
    centerName: string;
    channelAccessToken: string;
    channelSecret: string;
}
