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
        return 'ระบบกำลังส่งเรื่องให้เจ้าหน้าที่ กรุณารอสักครู่ครับ ทางเจ้าหน้าที่จะรีบตอบกลับโดยเร็วที่สุดครับ 🙏';
    }
};
exports.ContactHandler = ContactHandler;
exports.ContactHandler = ContactHandler = __decorate([
    (0, common_1.Injectable)()
], ContactHandler);
//# sourceMappingURL=contact.handler.js.map