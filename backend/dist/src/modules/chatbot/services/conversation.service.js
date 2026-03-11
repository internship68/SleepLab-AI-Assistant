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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ConversationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const types_1 = require("../../../shared/types");
const user_entity_1 = require("../entities/user.entity");
const conversation_entity_1 = require("../entities/conversation.entity");
let ConversationService = ConversationService_1 = class ConversationService {
    constructor(userRepository, conversationRepository) {
        this.userRepository = userRepository;
        this.conversationRepository = conversationRepository;
        this.logger = new common_1.Logger(ConversationService_1.name);
    }
    async getContext(lineUserId, lineOaId) {
        let user = await this.userRepository.findOne({
            where: { lineUserId, lineOaId },
        });
        if (!user) {
            this.logger.log(`[DB] New user | lineUserId=${lineUserId} | lineOaId=${lineOaId}`);
            user = this.userRepository.create({
                lineUserId,
                lineOaId,
                state: types_1.ConversationState.START,
                screeningScore: 0,
            });
            await this.userRepository.save(user);
        }
        return {
            userId: user.id,
            lineUserId: user.lineUserId,
            lineOaId: user.lineOaId,
            state: user.state,
            screeningStep: user.screeningStep,
            screeningScore: user.screeningScore ?? 0,
            lastMessage: user.lastMessage,
        };
    }
    async updateContext(userId, updates) {
        const updateObj = {};
        if (updates.state !== undefined)
            updateObj.state = updates.state;
        if (updates.screeningStep !== undefined)
            updateObj.screeningStep = updates.screeningStep;
        if (updates.screeningScore !== undefined)
            updateObj.screeningScore = updates.screeningScore;
        if (updates.lastMessage !== undefined)
            updateObj.lastMessage = updates.lastMessage;
        this.logger.log(`[DB] updateContext | ${JSON.stringify(updateObj)}`);
        await this.userRepository.update({ id: userId }, updateObj);
    }
    async saveMessage(userId, message, role) {
        const conversation = this.conversationRepository.create({ userId, message, role });
        await this.conversationRepository.save(conversation);
    }
};
exports.ConversationService = ConversationService;
exports.ConversationService = ConversationService = ConversationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(conversation_entity_1.Conversation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ConversationService);
//# sourceMappingURL=conversation.service.js.map