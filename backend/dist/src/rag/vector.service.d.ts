import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SearchContext } from '../shared/types';
import { FaqChunk } from '../knowledge-base/entities/faq-chunk.entity';
export declare class VectorSearchService {
    private readonly faqRepository;
    private readonly configService;
    private openai;
    constructor(faqRepository: Repository<FaqChunk>, configService: ConfigService);
    search(query: string, limit?: number): Promise<SearchContext[]>;
    private generateEmbedding;
}
