import { Injectable } from '@nestjs/common';
import { PromptBuilder } from './prompt.builder';
import { AIProvider } from './ai.interface';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AIService implements AIProvider {
    private openai: OpenAI;

    constructor(
        private readonly promptBuilder: PromptBuilder,
        private readonly configService: ConfigService,
    ) {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>('openai.apiKey'),
        });
    }

    async generate(prompt: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: this.configService.get<string>('openai.modelName') || 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
        });

        return response.choices[0].message.content || '';
    }

    async generateAnswer(question: string, context: string): Promise<string> {
        const prompt = this.promptBuilder.buildMedicalPrompt(question, context);
        return this.generate(prompt);
    }
}
