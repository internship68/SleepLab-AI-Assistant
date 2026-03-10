import { Module } from '@nestjs/common';
import { AIService } from './ai.service';
import { PromptBuilder } from './prompt.builder';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule],
    providers: [AIService, PromptBuilder],
    exports: [AIService],
})
export class AIModule { }
