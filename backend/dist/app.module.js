"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const line_module_1 = require("./modules/line/line.module");
const chatbot_module_1 = require("./modules/chatbot/chatbot.module");
const ai_module_1 = require("./ai/ai.module");
const rag_module_1 = require("./rag/rag.module");
const knowledge_base_module_1 = require("./knowledge-base/knowledge-base.module");
const line_config_1 = require("./config/line.config");
const openai_config_1 = require("./config/openai.config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [line_config_1.lineConfig, openai_config_1.openaiConfig],
            }),
            line_module_1.LineModule,
            chatbot_module_1.ChatbotModule,
            ai_module_1.AIModule,
            rag_module_1.RAGModule,
            knowledge_base_module_1.KnowledgeBaseModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map