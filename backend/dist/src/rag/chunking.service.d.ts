import { ConfigService } from '@nestjs/config';
export declare class ChunkingService {
    private readonly configService;
    constructor(configService: ConfigService);
    chunkText(text: string, maxTokens?: number): string[];
}
