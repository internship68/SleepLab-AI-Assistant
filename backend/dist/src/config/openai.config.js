"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openaiConfig = void 0;
const config_1 = require("@nestjs/config");
exports.openaiConfig = (0, config_1.registerAs)('openai', () => ({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: process.env.OPENAI_MODEL_NAME || 'gpt-4o-mini',
}));
//# sourceMappingURL=openai.config.js.map