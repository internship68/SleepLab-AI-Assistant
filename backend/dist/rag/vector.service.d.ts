import { SearchContext } from '../shared/types';
import { ConfigService } from '@nestjs/config';
export declare class VectorSearchService {
    private readonly configService;
    private openai;
    constructor(configService: ConfigService);
    search(query: string): Promise<SearchContext[]>;
    private generateEmbedding;
}
