import { registerAs } from '@nestjs/config';

export const openaiConfig = registerAs('openai', () => ({
    apiKey: process.env.OPENAI_API_KEY,
    modelName: process.env.OPENAI_MODEL_NAME || 'gpt-4o-mini',
}));
