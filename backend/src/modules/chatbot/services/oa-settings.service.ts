import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OASettings } from '../entities/oa-settings.entity';

@Injectable()
export class OASettingsService {
    constructor(
        @InjectRepository(OASettings)
        private readonly oaSettingsRepository: Repository<OASettings>,
    ) { }

    async getSettings(lineOaId: string): Promise<OASettings | null> {
        return this.oaSettingsRepository.findOne({ where: { lineOaId } });
    }

    async getCenterName(lineOaId: string): Promise<string> {
        const settings = await this.getSettings(lineOaId);
        return settings?.centerName ?? 'SMD Sappaya';
    }

    async getAllOAs(): Promise<OASettings[]> {
        return this.oaSettingsRepository.find();
    }
}
