import { Injectable } from '@nestjs/common';
import { MessageHandler } from './handler.interface';
import { UserContext } from '../../../shared/types';

@Injectable()
export class ContactHandler implements MessageHandler {
    async handle(message: string, context: UserContext): Promise<string> {
        return `💬 ขอบคุณค่ะ MOONi ได้รับข้อความของคุณแล้ว\n\nทีมเจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุดนะคะ 🙏\n\nเวลาทำการ: จันทร์–ศุกร์ 08:00–17:00 น.\n\nหากต้องการติดต่อด่วน สามารถโทรหาเราได้เลยค่ะ\nหรือจะพิมพ์คำถามทิ้งไว้ก็ได้ค่ะ 😊`;
    }
}
