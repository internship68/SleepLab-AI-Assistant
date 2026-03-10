import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as line from '@line/bot-sdk';

@Injectable()
export class LineClient {
    private client: line.Client;

    constructor(private readonly configService: ConfigService) {
        this.client = new line.Client({
            channelAccessToken: this.configService.get<string>('line.channelAccessToken'),
            channelSecret: this.configService.get<string>('line.channelSecret'),
        });
    }

    async replyMessage(replyToken: string, message: string): Promise<void> {
        await this.client.replyMessage(replyToken, {
            type: 'text',
            text: message,
        });
    }
}
