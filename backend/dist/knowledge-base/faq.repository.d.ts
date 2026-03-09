export declare class FAQRepository {
    saveFaq(content: string, embedding: number[], source: string): Promise<void>;
    getAllFaqs(): Promise<any[]>;
}
