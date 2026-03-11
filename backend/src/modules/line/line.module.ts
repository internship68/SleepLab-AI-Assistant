import { Module } from '@nestjs/common';
import { LineWebhookController } from './line.controller';
import { LineService } from './line.service';
import { LineClient } from './line.client';
import { LineClientModule } from './line-client.module';
import { ChatbotModule } from '../chatbot/chatbot.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, LineClientModule, ChatbotModule],
    controllers: [LineWebhookController],
    providers: [LineService],
    exports: [LineService],
})
export class LineModule { }
