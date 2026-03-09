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
exports.ChunkingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let ChunkingService = class ChunkingService {
    constructor(configService) {
        this.configService = configService;
    }
    chunkText(text, maxTokens = 500) {
        const sentences = text.split(/[\r\n]+/);
        const chunks = [];
        let currentChunk = '';
        for (const sentence of sentences) {
            if ((currentChunk.length + sentence.length) < maxTokens) {
                currentChunk += sentence + ' ';
            }
            else {
                chunks.push(currentChunk.trim());
                currentChunk = sentence + ' ';
            }
        }
        if (currentChunk.trim().length > 0) {
            chunks.push(currentChunk.trim());
        }
        return chunks;
    }
};
exports.ChunkingService = ChunkingService;
exports.ChunkingService = ChunkingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ChunkingService);
//# sourceMappingURL=chunking.service.js.map