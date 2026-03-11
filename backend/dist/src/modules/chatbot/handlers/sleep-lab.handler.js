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
exports.SleepLabHandler = void 0;
const common_1 = require("@nestjs/common");
const faq_service_1 = require("../services/faq.service");
let SleepLabHandler = class SleepLabHandler {
    constructor(faqService) {
        this.faqService = faqService;
    }
    async handle(message, context) {
        const ragAnswer = await this.faqService.answer(message, context);
        if (ragAnswer)
            return ragAnswer;
        return `🏥 บริการ Sleep Lab ของเราค่ะ\n\n✅ การตรวจ Sleep Test (PSG)\n✅ Home Sleep Test (at-home)\n✅ ปรึกษาแพทย์เฉพาะทาง\n\nสนใจนัดหมายหรือสอบถามแพ็กเกจ กรุณาพิมพ์คำถาม หรือ\n👉 กด E เพื่อให้เจ้าหน้าที่ติดต่อกลับค่ะ`;
    }
};
exports.SleepLabHandler = SleepLabHandler;
exports.SleepLabHandler = SleepLabHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [faq_service_1.FAQService])
], SleepLabHandler);
//# sourceMappingURL=sleep-lab.handler.js.map