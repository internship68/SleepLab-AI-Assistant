import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FaqChunk } from './entities/faq-chunk.entity';

@Injectable()
export class FAQRepository {
    constructor(
        @InjectRepository(FaqChunk)
        private readonly faqRepository: Repository<FaqChunk>,
    ) { }

    async saveFaq(content: string, embedding: number[], source: string): Promise<void> {
        const faq = this.faqRepository.create({
            content,
            embedding,
            source,
        });

        await this.faqRepository.save(faq);
        console.log(`[DB] Saved FAQ segment: ${source}`);
    }

    async getAllFaqs(): Promise<FaqChunk[]> {
        return this.faqRepository.find();
    }
}
