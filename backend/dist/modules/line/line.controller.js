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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineWebhookController = void 0;
const common_1 = require("@nestjs/common");
const line_service_1 = require("./line.service");
let LineWebhookController = class LineWebhookController {
    constructor(lineService) {
        this.lineService = lineService;
    }
    async handleWebhook(body, signature, channelId = 'default-oa') {
        const events = body.events || [];
        await Promise.all(events.map(event => this.lineService.handleEvent(event, channelId)));
        return 'OK';
    }
};
exports.LineWebhookController = LineWebhookController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Headers)('x-line-signature')),
    __param(2, (0, common_1.Headers)('x-line-channel-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], LineWebhookController.prototype, "handleWebhook", null);
exports.LineWebhookController = LineWebhookController = __decorate([
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [line_service_1.LineService])
], LineWebhookController);
//# sourceMappingURL=line.controller.js.map