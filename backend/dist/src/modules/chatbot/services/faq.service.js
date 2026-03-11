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
exports.FAQService = void 0;
const common_1 = require("@nestjs/common");
const vector_service_1 = require("../../../rag/vector.service");
const ai_service_1 = require("../../../ai/ai.service");
let FAQService = class FAQService {
    constructor(vectorSearch, ai) {
        this.vectorSearch = vectorSearch;
        this.ai = ai;
    }
    async answer(question, context) {
        const searchResults = await this.vectorSearch.search(question);
        if (!searchResults || searchResults.length === 0) {
            return 'ขออภัย ยังไม่มีข้อมูลในส่วนนี้ กรุณาติดต่อเจ้าหน้าที่';
        }
        const compiledContext = searchResults.map(s => s.content).join('\n---\n');
        return this.ai.generateAnswer(question, compiledContext);
    }
};
exports.FAQService = FAQService;
exports.FAQService = FAQService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [vector_service_1.VectorSearchService,
        ai_service_1.AIService])
], FAQService);
//# sourceMappingURL=faq.service.js.map