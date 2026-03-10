import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChunkingService {
    constructor(private readonly configService: ConfigService) { }

    chunkText(text: string, maxTokens: number = 500): string[] {
        // A simplified chunking logic
        // In production, use langchain text splitters or similar libraries
        const sentences = text.split(/[\r\n]+/);
        const chunks: string[] = [];

        let currentChunk = '';
        for (const sentence of sentences) {
            if ((currentChunk.length + sentence.length) < maxTokens) {
                currentChunk += sentence + ' ';
            } else {
                chunks.push(currentChunk.trim());
                currentChunk = sentence + ' ';
            }
        }

        if (currentChunk.trim().length > 0) {
            chunks.push(currentChunk.trim());
        }

        return chunks;
    }
}
