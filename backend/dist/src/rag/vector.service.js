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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorSearchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const faq_chunk_entity_1 = require("../knowledge-base/entities/faq-chunk.entity");
const openai_1 = __importDefault(require("openai"));
let VectorSearchService = class VectorSearchService {
    constructor(faqRepository, configService) {
        this.faqRepository = faqRepository;
        this.configService = configService;
        this.openai = new openai_1.default({
            apiKey: this.configService.get('openai.apiKey'),
        });
    }
    async search(query, limit = 3) {
        const queryEmbedding = await this.generateEmbedding(query);
        const embeddingStr = `[${queryEmbedding.join(',')}]`;
        const results = await this.faqRepository
            .createQueryBuilder('faq')
            .orderBy(`embedding <-> '${embeddingStr}'`)
            .limit(limit)
            .getMany();
        return results.map(result => ({
            content: result.content,
            source: result.source || 'unknown',
        }));
    }
    async generateEmbedding(text) {
        const response = await this.openai.embeddings.create({
            model: 'text-embedding-3-small',
            input: text,
        });
        return response.data[0].embedding;
    }
};
exports.VectorSearchService = VectorSearchService;
exports.VectorSearchService = VectorSearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(faq_chunk_entity_1.FaqChunk)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService])
], VectorSearchService);
//# sourceMappingURL=vector.service.js.map