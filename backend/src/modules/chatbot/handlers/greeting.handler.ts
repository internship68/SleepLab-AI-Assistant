import { Injectable } from '@nestjs/common';
import { MessageHandler } from './handler.interface';
import { UserContext } from '../../../shared/types';
import { OASettingsService } from '../services/oa-settings.service';

@Injectable()
export class GreetingHandler implements MessageHandler {
    constructor(private readonly oaSettingsService: OASettingsService) { }

    async handle(message: string, context: UserContext): Promise<string> {
        const centerName = await this.oaSettingsService.getCenterName(context.lineOaId);
        return this.buildGreeting(centerName);
    }

    buildGreeting(centerName: string): string {
        return `สวัสดีค่ะ ยินดีต้อนรับสู่ ${centerName} 🌙\n\nMOONi (มู-นี่) ผู้ช่วยอัจฉริยะดูแลคุณภาพการนอนหลับของคุณค่ะ ✨\n\nMOONi ถูกสร้างขึ้นเพื่อดูแลให้ทุกค่ำคืนของคุณเป็นการพักผ่อนที่ดีที่สุด ด้วยมาตรฐานทางการแพทย์ (Medical-safe) ค่ะ ไม่ว่าจะเป็นเรื่องอาการนอนกรน การตรวจ Sleep Test หรือการดูแลผู้สูงอายุ\n\nวันนี้ให้ MOONi ดูแลเรื่องไหนดีคะ?\n\nA. 🛌 ประเมินความเสี่ยง (นอนกรน/หยุดหายใจ?)\nB. 🏥 รู้จักบริการ Sleep Lab & นัดหมาย\nC. ⚙️ ปรึกษาปัญหา CPAP / หน้ากาก\nD. 👵 ดูแลการนอนผู้สูงอายุ\nE. 💬 ติดต่อเจ้าหน้าที่`;
    }
}
