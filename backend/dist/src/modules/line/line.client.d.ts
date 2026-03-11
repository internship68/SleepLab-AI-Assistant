import { ConfigService } from '@nestjs/config';
export declare class LineClient {
    private readonly configService;
    private client;
    constructor(configService: ConfigService);
    replyMessage(replyToken: string, message: string): Promise<void>;
}
