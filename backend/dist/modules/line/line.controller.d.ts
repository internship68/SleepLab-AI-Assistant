import { LineService } from './line.service';
import { WebhookRequestBody } from '@line/bot-sdk';
export declare class LineWebhookController {
    private readonly lineService;
    constructor(lineService: LineService);
    handleWebhook(body: WebhookRequestBody, signature: string, channelId?: string): Promise<string>;
}
