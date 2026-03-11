import { MessageHandler } from './handler.interface';
import { UserContext } from '../../../shared/types';
import { OASettingsService } from '../services/oa-settings.service';
export declare class GreetingHandler implements MessageHandler {
    private readonly oaSettingsService;
    constructor(oaSettingsService: OASettingsService);
    handle(message: string, context: UserContext): Promise<string>;
    buildGreeting(centerName: string): string;
}
