import { Injectable } from '@nestjs/common';
import { MessageHandler } from './handler.interface';
import { UserContext } from '../../../shared/types';
import { FAQService } from '../services/faq.service';

@Injectable()
export class FAQHandler implements MessageHandler {
    constructor(private readonly faqService: FAQService) { }

    async handle(message: string, context: UserContext): Promise<string> {
        return this.faqService.answer(message, context);
    }
}
