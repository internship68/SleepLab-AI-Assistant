import { MessageHandler } from './handler.interface';
import { UserContext } from '../../../shared/types';
import { FAQService } from '../services/faq.service';
export declare class ElderlyHandler implements MessageHandler {
    private readonly faqService;
    constructor(faqService: FAQService);
    handle(message: string, context: UserContext): Promise<string>;
}
