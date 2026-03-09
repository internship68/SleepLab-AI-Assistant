import { VectorSearchService } from '../../../rag/vector.service';
import { AIService } from '../../../ai/ai.service';
import { UserContext } from '../../../shared/types';
export declare class FAQService {
    private readonly vectorSearch;
    private readonly ai;
    constructor(vectorSearch: VectorSearchService, ai: AIService);
    answer(question: string, context: UserContext): Promise<string>;
}
