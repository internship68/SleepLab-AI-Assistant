import { Module } from '@nestjs/common';
import { LineWebhookController } from './line.controller';
import { LineService } from './line.service';
import { LineClient } from './line.client';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, ChatbotModule],
    controllers: [LineWebhookController],
    providers: [LineService, LineClient],
    exports: [LineService],
})
export class LineModule { }
