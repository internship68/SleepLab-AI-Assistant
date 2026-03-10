import { Injectable } from '@nestjs/common';
import { MessageHandler } from './handler.interface';
import { UserContext } from '../../../shared/types';
import { FAQService } from '../services/faq.service';

@Injectable()
export class CPAPHandler implements MessageHandler {
    constructor(private readonly faqService: FAQService) { }

    async handle(message: string, context: UserContext): Promise<string> {
        const ragAnswer = await this.faqService.answer(message, context);
        if (ragAnswer) return ragAnswer;

        return `⚙️ ปรึกษาปัญหา CPAP / หน้ากากค่ะ\n\nMOONi สามารถช่วยเรื่อง:\n• การเลือกหน้ากาก CPAP ที่เหมาะกับหน้า\n• แรงดันลม (Pressure) ที่เหมาะสม\n• ปัญหาก๊าซ/ลมรั่วจากหน้ากาก\n• การทำความสะอาดอุปกรณ์\n\nกรุณาพิมพ์อาการหรือปัญหาที่พบเลยค่ะ 😊`;
    }
}
