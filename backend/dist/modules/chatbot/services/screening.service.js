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
exports.ScreeningService = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../../../shared/types");
const conversation_service_1 = require("./conversation.service");
let ScreeningService = class ScreeningService {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    async process(message, context) {
        switch (context.state) {
            case types_1.ConversationState.START:
            case types_1.ConversationState.FAQ:
                await this.conversationService.updateContext(context.userId, { state: types_1.ConversationState.SCREENING_Q1 });
                return 'เริ่มต้นการคัดกรองอาการครับ 📝\n\nคำถามที่ 1: คุณมีอาการอย่างไรบ้างครับ?';
            case types_1.ConversationState.SCREENING_Q1:
                await this.conversationService.updateContext(context.userId, { state: types_1.ConversationState.SCREENING_Q2 });
                return 'คำถามที่ 2: เป็นมานานเท่าไหร่แล้วครับ?';
            case types_1.ConversationState.SCREENING_Q2:
                await this.conversationService.updateContext(context.userId, { state: types_1.ConversationState.SCREENING_Q3 });
                return 'คำถามที่ 3: เคยทานยาหรือรับการรักษาอะไรมาก่อนไหมครับ?';
            case types_1.ConversationState.SCREENING_Q3:
                await this.conversationService.updateContext(context.userId, { state: types_1.ConversationState.FAQ });
                return 'ขอบคุณสำหรับข้อมูลครับ เราได้บันทึกข้อมูลเบื้องต้นของท่านแล้ว\nระหว่างรอการติดต่อกลับ ท่านสามารถสอบถามข้อมูลเบื้องต้นได้เลยครับ';
            default:
                return 'ขออภัยครับ ระบบคัดกรองเกิดข้อผิดพลาด';
        }
    }
};
exports.ScreeningService = ScreeningService;
exports.ScreeningService = ScreeningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ScreeningService);
//# sourceMappingURL=screening.service.js.map