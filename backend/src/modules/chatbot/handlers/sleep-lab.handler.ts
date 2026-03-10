import { Injectable } from '@nestjs/common';
import { MessageHandler } from './handler.interface';
import { UserContext } from '../../../shared/types';
import { FAQService } from '../services/faq.service';

@Injectable()
export class SleepLabHandler implements MessageHandler {
    constructor(private readonly faqService: FAQService) { }

    async handle(message: string, context: UserContext): Promise<string> {
        // Use RAG to answer Sleep Lab specific questions
        const ragAnswer = await this.faqService.answer(message, context);
        if (ragAnswer) return ragAnswer;

        return `🏥 บริการ Sleep Lab ของเราค่ะ\n\n✅ การตรวจ Sleep Test (PSG)\n✅ Home Sleep Test (at-home)\n✅ ปรึกษาแพทย์เฉพาะทาง\n\nสนใจนัดหมายหรือสอบถามแพ็กเกจ กรุณาพิมพ์คำถาม หรือ\n👉 กด E เพื่อให้เจ้าหน้าที่ติดต่อกลับค่ะ`;
    }
}
