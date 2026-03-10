import { Injectable } from '@nestjs/common';
import { VectorSearchService } from '../../../rag/vector.service';
import { AIService } from '../../../ai/ai.service';
import { UserContext } from '../../../shared/types';

@Injectable()
export class FAQService {
    constructor(
        private readonly vectorSearch: VectorSearchService,
        private readonly ai: AIService,
    ) { }

    async answer(question: string, context: UserContext): Promise<string> {
        const searchResults = await this.vectorSearch.search(question);

        if (!searchResults || searchResults.length === 0) {
            return 'ขออภัย ยังไม่มีข้อมูลในส่วนนี้ กรุณาติดต่อเจ้าหน้าที่';
        }

        const compiledContext = searchResults.map(s => s.content).join('\n---\n');
        return this.ai.generateAnswer(question, compiledContext);
    }
}
