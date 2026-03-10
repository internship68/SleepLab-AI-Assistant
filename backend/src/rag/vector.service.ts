import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { SearchContext } from '../shared/types';
import { FaqChunk } from '../knowledge-base/entities/faq-chunk.entity';
import OpenAI from 'openai';

@Injectable()
export class VectorSearchService {
    private openai: OpenAI;

    constructor(
        @InjectRepository(FaqChunk)
        private readonly faqRepository: Repository<FaqChunk>,
        private readonly configService: ConfigService,
    ) {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>('openai.apiKey'),
        });
    }

    async search(query: string, limit: number = 3): Promise<SearchContext[]> {
        // 1. Generate embedding for query
        const queryEmbedding = await this.generateEmbedding(query);
        const embeddingStr = `[${queryEmbedding.join(',')}]`;

        // 2. Search in Vector DB (pgvector via raw query in TypeORM)
        // '<->' is the L2 distance operator in pgvector
        const results = await this.faqRepository
            .createQueryBuilder('faq')
            .orderBy(`embedding <-> '${embeddingStr}'`)
            .limit(limit)
            .getMany();

        return results.map(result => ({
            content: result.content,
            source: result.source || 'unknown',
        }));
    }

    private async generateEmbedding(text: string): Promise<number[]> {
        const response = await this.openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: text,
        });
        return response.data[0].embedding;
    }
}
