import { Injectable } from '@nestjs/common';
import { MessageHandler } from './handler.interface';
import { UserContext } from '../../../shared/types';
import { FAQService } from '../services/faq.service';

@Injectable()
export class ElderlyHandler implements MessageHandler {
    constructor(private readonly faqService: FAQService) { }

    async handle(message: string, context: UserContext): Promise<string> {
        const ragAnswer = await this.faqService.answer(message, context);
        if (ragAnswer) return ragAnswer;

        return `👵 การดูแลการนอนผู้สูงอายุค่ะ\n\nปัญหาการนอนที่พบบ่อยในผู้สูงอายุ:\n• นอนไม่หลับ / หลับๆ ตื่นๆ\n• นอนกรนและหยุดหายใจขณะหลับ (OSA)\n• ตื่นกลางดึกบ่อย\n• ฝันไม่ดี / สับสนเวลากลางคืน\n\nกรุณาพิมพ์อาการที่สังเกตพบ หรือกดเลือก:\n👉 E เพื่อพูดคุยกับผู้เชี่ยวชาญโดยตรงค่ะ`;
    }
}
