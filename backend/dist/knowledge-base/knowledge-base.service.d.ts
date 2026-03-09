import { FAQRepository } from './faq.repository';
export declare class KnowledgeBaseService {
    private readonly faqRepository;
    constructor(faqRepository: FAQRepository);
    processAndStoreFaq(text: string, source: string): Promise<void>;
}
