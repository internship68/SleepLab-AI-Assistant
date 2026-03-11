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
exports.GreetingHandler = void 0;
const common_1 = require("@nestjs/common");
const oa_settings_service_1 = require("../services/oa-settings.service");
let GreetingHandler = class GreetingHandler {
    constructor(oaSettingsService) {
        this.oaSettingsService = oaSettingsService;
    }
    async handle(message, context) {
        const centerName = await this.oaSettingsService.getCenterName(context.lineOaId);
        return this.buildGreeting(centerName);
    }
    buildGreeting(centerName) {
        const welcome = centerName?.trim()
            ? `ยินดีต้อนรับสู่ ${centerName} 🌙`
            : 'ยินดีต้อนรับค่ะ 🌙';
        return `สวัสดีค่ะ ${welcome}\n\nMOONi (มู-นี่) ผู้ช่วยอัจฉริยะดูแลคุณภาพการนอนหลับของคุณค่ะ ✨\n\nMOONi ถูกสร้างขึ้นเพื่อดูแลให้ทุกค่ำคืนของคุณเป็นการพักผ่อนที่ดีที่สุด ด้วยมาตรฐานทางการแพทย์ (Medical-safe) ค่ะ ไม่ว่าจะเป็นเรื่องอาการนอนกรน การตรวจ Sleep Test หรือการดูแลผู้สูงอายุ\n\nวันนี้ให้ MOONi ดูแลเรื่องไหนดีคะ?\n\nA. 🛌 ประเมินความเสี่ยง (นอนกรน/หยุดหายใจ?)\nB. 🏥 รู้จักบริการ Sleep Lab & นัดหมาย\nC. ⚙️ ปรึกษาปัญหา CPAP / หน้ากาก\nD. 👵 ดูแลการนอนผู้สูงอายุ\nE. 💬 ติดต่อเจ้าหน้าที่`;
    }
};
exports.GreetingHandler = GreetingHandler;
exports.GreetingHandler = GreetingHandler = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [oa_settings_service_1.OASettingsService])
], GreetingHandler);
//# sourceMappingURL=greeting.handler.js.map