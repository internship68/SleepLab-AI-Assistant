import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRouter } from './router/message.router';
import { GreetingHandler } from './handlers/greeting.handler';
import { ScreeningHandler } from './handlers/screening.handler';
import { FAQHandler } from './handlers/faq.handler';
import { ContactHandler } from './handlers/contact.handler';
import { SleepLabHandler } from './handlers/sleep-lab.handler';
import { CPAPHandler } from './handlers/cpap.handler';
import { ElderlyHandler } from './handlers/elderly.handler';
import { ConversationService } from './services/conversation.service';
import { ScreeningService } from './services/screening.service';
import { FAQService } from './services/faq.service';
import { OASettingsService } from './services/oa-settings.service';
import { RAGModule } from '../../rag/rag.module';
import { AIModule } from '../../ai/ai.module';
import { User } from './entities/user.entity';
import { Conversation } from './entities/conversation.entity';
import { OASettings } from './entities/oa-settings.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Conversation, OASettings]),
        RAGModule,
        AIModule,
    ],
    providers: [
        MessageRouter,
        GreetingHandler,
        ScreeningHandler,
        FAQHandler,
        ContactHandler,
        SleepLabHandler,
        CPAPHandler,
        ElderlyHandler,
        ConversationService,
        ScreeningService,
        FAQService,
        OASettingsService,
    ],
    exports: [MessageRouter, ConversationService, OASettingsService],
})
export class ChatbotModule { }
