"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../../../shared/types");
let ConversationService = class ConversationService {
    constructor() {
        this.mockDb = new Map();
    }
    async getContext(userId, lineOaId) {
        let context = this.mockDb.get(userId);
        if (!context) {
            context = {
                userId,
                lineOaId,
                state: types_1.ConversationState.START,
            };
            this.mockDb.set(userId, context);
        }
        return context;
    }
    async updateContext(userId, updates) {
        const context = await this.getContext(userId, '');
        this.mockDb.set(userId, { ...context, ...updates });
    }
    async saveMessage(userId, message, role) {
        console.log(`[DB] Saved ${role} message for ${userId}: ${message}`);
    }
};
exports.ConversationService = ConversationService;
exports.ConversationService = ConversationService = __decorate([
    (0, common_1.Injectable)()
], ConversationService);
//# sourceMappingURL=conversation.service.js.map