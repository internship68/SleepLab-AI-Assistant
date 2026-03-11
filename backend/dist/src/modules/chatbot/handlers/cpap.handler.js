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
exports.CPAPHandler = void 0;
const common_1 = require("@nestjs/common");
const faq_service_1 = require("../services/faq.service");
let CPAPHandler = class CPAPHandler {
    constructor(faqService) {
        this.faqService = faqService;
    }
    async handle(message, context) {
        const ragAnswer = await this.faqService.answer(message, context);
        if (ragAnswer)
            return ragAnswer;
        return `⚙️ ปรึกษาปัญหา CPAP / หน้ากากค่ะ\n\nMOONi สามารถช่วยเรื่อง:\n• การเลือกหน้ากาก CPAP ที่เหมาะกับหน้า\n• แรงดันลม (Pressure) ที่เหมาะสม\n• ปัญหาก๊าซ/ลมรั่วจากหน้ากาก\n• การทำความสะอาดอุปกรณ์\n\nกรุณาพิมพ์อาการหรือปัญหาที่พบเลยค่ะ 😊`;
    }
};
exports.CPAPHandler = CPAPHandler;
exports.CPAPHandler = CPAPHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [faq_service_1.FAQService])
], CPAPHandler);
//# sourceMappingURL=cpap.handler.js.map