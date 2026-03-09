"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatbotModule = void 0;
const common_1 = require("@nestjs/common");
const message_router_1 = require("./router/message.router");
const greeting_handler_1 = require("./handlers/greeting.handler");
const screening_handler_1 = require("./handlers/screening.handler");
const faq_handler_1 = require("./handlers/faq.handler");
const contact_handler_1 = require("./handlers/contact.handler");
const conversation_service_1 = require("./services/conversation.service");
const screening_service_1 = require("./services/screening.service");
const faq_service_1 = require("./services/faq.service");
const rag_module_1 = require("../../rag/rag.module");
const ai_module_1 = require("../../ai/ai.module");
let ChatbotModule = class ChatbotModule {
};
exports.ChatbotModule = ChatbotModule;
exports.ChatbotModule = ChatbotModule = __decorate([
    (0, common_1.Module)({
        imports: [rag_module_1.RAGModule, ai_module_1.AIModule],
        providers: [
            message_router_1.MessageRouter,
            greeting_handler_1.GreetingHandler,
            screening_handler_1.ScreeningHandler,
            faq_handler_1.FAQHandler,
            contact_handler_1.ContactHandler,
            conversation_service_1.ConversationService,
            screening_service_1.ScreeningService,
            faq_service_1.FAQService,
        ],
        exports: [message_router_1.MessageRouter, conversation_service_1.ConversationService],
    })
], ChatbotModule);
//# sourceMappingURL=chatbot.module.js.map