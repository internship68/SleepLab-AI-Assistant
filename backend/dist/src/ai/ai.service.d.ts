import { PromptBuilder } from './prompt.builder';
import { AIProvider } from './ai.interface';
import { ConfigService } from '@nestjs/config';
export declare class AIService implements AIProvider {
    private readonly promptBuilder;
    private readonly configService;
    private openai;
    constructor(promptBuilder: PromptBuilder, configService: ConfigService);
    generate(prompt: string): Promise<string>;
    generateAnswer(question: string, context: string): Promise<string>;
}
