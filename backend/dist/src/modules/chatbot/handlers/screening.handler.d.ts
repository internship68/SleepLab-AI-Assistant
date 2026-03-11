import { MessageHandler } from './handler.interface';
import { UserContext } from '../../../shared/types';
import { ScreeningService } from '../services/screening.service';
export declare class ScreeningHandler implements MessageHandler {
    private readonly screeningService;
    constructor(screeningService: ScreeningService);
    start(context: UserContext): Promise<string>;
    handle(message: string, context: UserContext): Promise<string>;
}
