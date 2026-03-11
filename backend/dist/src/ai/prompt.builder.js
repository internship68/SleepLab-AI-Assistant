"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptBuilder = void 0;
const common_1 = require("@nestjs/common");
let PromptBuilder = class PromptBuilder {
    buildMedicalPrompt(question, context) {
        return `
You are a medical assistant chatbot.
Answer ONLY from the provided context.
If the information is not found, reply that the system does not have information and suggest contacting staff.
Do not generate medical advice beyond the provided data.

Context:
${context}

Question:
${question}

Answer:
    `;
    }
};
exports.PromptBuilder = PromptBuilder;
exports.PromptBuilder = PromptBuilder = __decorate([
    (0, common_1.Injectable)()
], PromptBuilder);
//# sourceMappingURL=prompt.builder.js.map