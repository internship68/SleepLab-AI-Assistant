import { Controller, Post, Body, Headers, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LineService } from './line.service';
import { WebhookRequestBody } from '@line/bot-sdk';

@Controller('webhook')
export class LineWebhookController {
    private readonly logger = new Logger(LineWebhookController.name);

    constructor(
        private readonly lineService: LineService,
        private readonly configService: ConfigService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async handleWebhook(
        @Body() body: WebhookRequestBody,
        @Headers('x-line-signature') signature: string,
        @Headers('x-line-channel-id') channelIdHeader: string | undefined,
    ) {
        const channelId = channelIdHeader ?? this.configService.get<string>('line.defaultOaId') ?? 'default';
        const events = body.events || [];
        this.logger.log(`[WEBHOOK] Received ${events.length} event(s) | channelId=${channelId}`);

        for (const event of events) {
            this.logger.log(`[WEBHOOK] Event type=${event.type} | source=${(event as any).source?.userId ?? 'N/A'}`);
        }

        await Promise.all(
            events.map(event => this.lineService.handleEvent(event, channelId))
        );

        this.logger.log(`[WEBHOOK] Done processing`);
        return 'OK';
    }
}
