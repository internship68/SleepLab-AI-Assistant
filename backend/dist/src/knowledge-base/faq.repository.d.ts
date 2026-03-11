import { Repository } from 'typeorm';
import { FaqChunk } from './entities/faq-chunk.entity';
export declare class FAQRepository {
    private readonly faqRepository;
    constructor(faqRepository: Repository<FaqChunk>);
    saveFaq(content: string, embedding: number[], source: string): Promise<void>;
    getAllFaqs(): Promise<FaqChunk[]>;
}
