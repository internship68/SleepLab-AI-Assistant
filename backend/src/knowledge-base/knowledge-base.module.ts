import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FAQRepository } from './faq.repository';
import { KnowledgeBaseService } from './knowledge-base.service';
import { FaqChunk } from './entities/faq-chunk.entity';

@Module({
    imports: [TypeOrmModule.forFeature([FaqChunk])],
    providers: [FAQRepository, KnowledgeBaseService],
    exports: [KnowledgeBaseService],
})
export class KnowledgeBaseModule { }
