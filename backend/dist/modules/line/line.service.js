"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineService = void 0;
const common_1 = require("@nestjs/common");
const line_client_1 = require("./line.client");
const message_router_1 = require("../chatbot/router/message.router");
const conversation_service_1 = require("../chatbot/services/conversation.service");
let LineService = class LineService {
    constructor(lineClient, messageRouter, conversationService) {
        this.lineClient = lineClient;
        this.messageRouter = messageRouter;
        this.conversationService = conversationService;
    }
    async handleEvent(event, channelId) {
        if (event.type !== 'message' || event.message.type !== 'text') {
            return;
        }
        const { replyToken } = event;
        const { text } = event.message;
        const userId = event.source.userId;
        if (!userId) {
            return;
        }
        const context = await this.conversationService.getContext(userId, channelId);
        await this.conversationService.saveMessage(userId, text, 'user');
        const responseText = await this.messageRouter.route(text, context);
        await this.conversationService.saveMessage(userId, responseText, 'assistant');
        await this.lineClient.replyMessage(replyToken, responseText);
    }
};
exports.LineService = LineService;
exports.LineService = LineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [line_client_1.LineClient,
        message_router_1.MessageRouter,
        conversation_service_1.ConversationService])
], LineService);
//# sourceMappingURL=line.service.js.map