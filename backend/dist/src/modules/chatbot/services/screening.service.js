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
const YES_KEYWORDS = ['ใช่', 'yes', 'มี', 'ใช', 'ค่ะ', 'ครับ', 'a', 'A'];
const NO_KEYWORDS = ['ไม่ใช่', 'no', 'ไม่มี', 'ไม่', 'b', 'B'];
let ScreeningService = class ScreeningService {
    constructor(conversationService) {
        this.conversationService = conversationService;
    }
    async start(context) {
        await this.conversationService.updateContext(context.userId, {
            state: types_1.ConversationState.SCREENING_Q1,
            screeningScore: 0,
        });
        return this.question1();
    }
    async process(message, context) {
        const isYes = YES_KEYWORDS.some(k => message.includes(k));
        const score = (context.screeningScore ?? 0) + (isYes ? 1 : 0);
        switch (context.state) {
            case types_1.ConversationState.SCREENING_Q1:
                await this.conversationService.updateContext(context.userId, {
                    state: types_1.ConversationState.SCREENING_Q2,
                    screeningScore: score,
                });
                return this.question2();
            case types_1.ConversationState.SCREENING_Q2:
                await this.conversationService.updateContext(context.userId, {
                    state: types_1.ConversationState.SCREENING_Q3,
                    screeningScore: score,
                });
                return this.question3();
            case types_1.ConversationState.SCREENING_Q3:
                await this.conversationService.updateContext(context.userId, {
                    state: types_1.ConversationState.SCREENING_DONE,
                    screeningScore: score,
                });
                return this.result(score);
            default:
                return this.start(context);
        }
    }
    question1() {
        return `การหมั่นสังเกตการนอน คือจุดเริ่มต้นของสุขภาพที่ดีค่ะ 🛌\n\nเพื่อให้ MOONi ประเมินได้แม่นยำ ขออนุญาตสอบถามอาการสั้นๆ 3 ข้อนะคะ\n\n1️⃣ คุณนอนกรนเสียงดัง (จนรบกวนคนข้างๆ) หรือมีเสียงเงียบไปพักหนึ่งแล้วตามด้วยเสียงเฮือกเหมือนสำลัก ใช่หรือไม่คะ?\n\n[ ใช่ ] / [ ไม่ใช่ ]`;
    }
    question2() {
        return `2️⃣ ตื่นเช้ามาแล้วรู้สึกไม่สดชื่น ปวดหัว มึนงง หรืออ่อนเพลียมากในตอนกลางวัน ทั้งที่ชั่วโมงการนอนน่าจะพอ?\n\n[ ใช่ ] / [ ไม่ใช่ ]`;
    }
    question3() {
        return `3️⃣ มีโรคประจำตัว เช่น ความดันโลหิตสูง เบาหวาน หรือโรคหัวใจ ร่วมด้วยหรือไม่คะ?\n\n[ มี ] / [ ไม่มี ]`;
    }
    result(score) {
        if (score >= 2) {
            return `⚠️ ผลการประเมินเบื้องต้น:\n\nคุณมีความเสี่ยง 'ระดับสูง' ที่จะมีภาวะหยุดหายใจขณะหลับ (OSA) ค่ะ อาการเหล่านี้อาจส่งผลให้ระดับออกซิเจนในเลือดลดลงและกระทบต่อหัวใจได้ในระยะยาว\n\nMOONi แนะนำให้ทำการตรวจการนอนหลับ (Sleep Test) เพื่อให้แพทย์วินิจฉัยอย่างละเอียดนะคะ สนใจดูรายละเอียดแพ็กเกจไหมคะ?\n\n[ ดูแพ็กเกจ Sleep Test ] / [ ติดต่อเจ้าหน้าที่ ]`;
        }
        return `✅ ผลการประเมินเบื้องต้น:\n\nความเสี่ยงยังอยู่ในระดับ 'ทั่วไป' ค่ะ แต่อาการเพลียอาจเกิดจากคุณภาพการนอนที่ไม่ดี (Sleep Quality)\n\nMOONi มีบทความแนะนำเรื่อง 'Sleep Hygiene: 10 เคล็ดลับจัดห้องนอนให้หลับลึก' มาฝาก ลองนำไปปรับใช้ดูนะคะ 😊\n\nหากมีคำถามเพิ่มเติม พิมพ์ถามได้เลยนะคะ`;
    }
};
exports.ScreeningService = ScreeningService;
exports.ScreeningService = ScreeningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [conversation_service_1.ConversationService])
], ScreeningService);
//# sourceMappingURL=screening.service.js.map