import { Controller, Post, Body, Headers, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { LineService } from './line.service';
import { WebhookRequestBody } from '@line/bot-sdk';

@Controller('webhook')
export class LineWebhookController {
    constructor(private readonly lineService: LineService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async handleWebhook(
        @Body() body: WebhookRequestBody,
        @Headers('x-line-signature') signature: string, // Would normally use to verify signature
        @Headers('x-line-channel-id') channelId: string = 'default-oa', // Use a header or dynamic path for multi-OA
    ) {
        const events = body.events || [];

        // Process all events (usually 1 per request)
        await Promise.all(
            events.map(event => this.lineService.handleEvent(event, channelId))
        );

        return 'OK';
    }
}
