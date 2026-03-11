"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactHandler = void 0;
const common_1 = require("@nestjs/common");
let ContactHandler = class ContactHandler {
    async handle(message, context) {
        return `💬 ขอบคุณค่ะ MOONi ได้รับข้อความของคุณแล้ว\n\nทีมเจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุดนะคะ 🙏\n\nเวลาทำการ: จันทร์–ศุกร์ 08:00–17:00 น.\n\nหากต้องการติดต่อด่วน สามารถโทรหาเราได้เลยค่ะ\nหรือจะพิมพ์คำถามทิ้งไว้ก็ได้ค่ะ 😊`;
    }
};
exports.ContactHandler = ContactHandler;
exports.ContactHandler = ContactHandler = __decorate([
    (0, common_1.Injectable)()
], ContactHandler);
//# sourceMappingURL=contact.handler.js.map