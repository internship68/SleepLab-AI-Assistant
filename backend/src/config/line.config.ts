import { registerAs } from '@nestjs/config';

export const lineConfig = registerAs('line', () => ({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
    defaultOaId: process.env.LINE_OA_ID ?? process.env.LINE_CHANNEL_ID ?? 'default',
    defaultCenterName: process.env.DEFAULT_CENTER_NAME ?? '',
}));
