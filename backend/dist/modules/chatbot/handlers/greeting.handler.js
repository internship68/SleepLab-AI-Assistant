"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreetingHandler = void 0;
const common_1 = require("@nestjs/common");
let GreetingHandler = class GreetingHandler {
    async handle(message, context) {
        return 'สวัสดีครับ ผมคือระบบผู้ช่วย AI ยินดีให้คำปรึกษาและตอบคำถามเบื้องต้นครับ 🙏\n\n- หากต้องการสอบถามข้อมูล พิมพ์คำถามได้เลยครับ\n- หากต้องการคัดกรองอาการ พิมพ์ "คัดกรองอาการ"\n- หากต้องการติดต่อเจ้าหน้าที่ พิมพ์ "ติดต่อเจ้าหน้าที่"';
    }
};
exports.GreetingHandler = GreetingHandler;
exports.GreetingHandler = GreetingHandler = __decorate([
    (0, common_1.Injectable)()
], GreetingHandler);
//# sourceMappingURL=greeting.handler.js.map