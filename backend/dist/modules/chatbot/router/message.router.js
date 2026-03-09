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
exports.MessageRouter = void 0;
const common_1 = require("@nestjs/common");
const types_1 = require("../../../shared/types");
const screening_handler_1 = require("../handlers/screening.handler");
const faq_handler_1 = require("../handlers/faq.handler");
const contact_handler_1 = require("../handlers/contact.handler");
const greeting_handler_1 = require("../handlers/greeting.handler");
let MessageRouter = class MessageRouter {
    constructor(screeningHandler, faqHandler, contactHandler, greetingHandler) {
        this.screeningHandler = screeningHandler;
        this.faqHandler = faqHandler;
        this.contactHandler = contactHandler;
        this.greetingHandler = greetingHandler;
    }
    async route(message, context) {
        if (context.state.startsWith('SCREENING') || message.includes('คัดกรองอาการ')) {
            return this.screeningHandler.handle(message, context);
        }
        if (this.isContactStaff(message) || context.state === types_1.ConversationState.CONTACT_STAFF) {
            return this.contactHandler.handle(message, context);
        }
        if (this.isGreeting(message) && context.state === types_1.ConversationState.START) {
            return this.greetingHandler.handle(message, context);
        }
        return this.faqHandler.handle(message, context);
    }
    isGreeting(message) {
        const greetings = ['สวัสดี', 'hi', 'hello', 'เริ่มต้น', 'start'];
        return greetings.some(g => message.toLowerCase().includes(g));
    }
    isContactStaff(message) {
        const keywords = ['ติดต่อเจ้าหน้าที่', 'แอดมิน', 'คุยกับคน'];
        return keywords.some(k => message.includes(k));
    }
};
exports.MessageRouter = MessageRouter;
exports.MessageRouter = MessageRouter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [screening_handler_1.ScreeningHandler,
        faq_handler_1.FAQHandler,
        contact_handler_1.ContactHandler,
        greeting_handler_1.GreetingHandler])
], MessageRouter);
//# sourceMappingURL=message.router.js.map