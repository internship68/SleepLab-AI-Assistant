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
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const prompt_builder_1 = require("./prompt.builder");
const config_1 = require("@nestjs/config");
const openai_1 = require("openai");
let AIService = class AIService {
    constructor(promptBuilder, configService) {
        this.promptBuilder = promptBuilder;
        this.configService = configService;
        this.openai = new openai_1.default({
            apiKey: this.configService.get('openai.apiKey'),
        });
    }
    async generate(prompt) {
        const response = await this.openai.chat.completions.create({
            model: this.configService.get('openai.modelName') || 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
        });
        return response.choices[0].message.content || '';
    }
    async generateAnswer(question, context) {
        const prompt = this.promptBuilder.buildMedicalPrompt(question, context);
        return this.generate(prompt);
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prompt_builder_1.PromptBuilder,
        config_1.ConfigService])
], AIService);
//# sourceMappingURL=ai.service.js.map