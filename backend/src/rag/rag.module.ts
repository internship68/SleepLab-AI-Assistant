import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VectorSearchService } from './vector.service';
import { ChunkingService } from './chunking.service';
import { ConfigModule } from '@nestjs/config';
import { FaqChunk } from '../knowledge-base/entities/faq-chunk.entity';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forFeature([FaqChunk]),
    ],
    providers: [VectorSearchService, ChunkingService],
    exports: [VectorSearchService, ChunkingService],
})
export class RAGModule { }
