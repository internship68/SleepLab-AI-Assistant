"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineConfig = void 0;
const config_1 = require("@nestjs/config");
exports.lineConfig = (0, config_1.registerAs)('line', () => ({
    channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.LINE_CHANNEL_SECRET,
}));
//# sourceMappingURL=line.config.js.map