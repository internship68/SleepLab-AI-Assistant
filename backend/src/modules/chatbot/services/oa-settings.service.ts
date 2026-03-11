import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OASettings } from '../entities/oa-settings.entity';

@Injectable()
export class OASettingsService {
    constructor(
        @InjectRepository(OASettings)
        private readonly oaSettingsRepository: Repository<OASettings>,
        private readonly configService: ConfigService,
    ) { }

    async getSettings(lineOaId: string): Promise<OASettings | null> {
        return this.oaSettingsRepository.findOne({ where: { lineOaId } });
    }

    async getCenterName(lineOaId: string): Promise<string> {
        const settings = await this.getSettings(lineOaId);
        const fallback = this.configService.get<string>('line.defaultCenterName');
        return settings?.centerName ?? fallback ?? '';
    }

    async getAllOAs(): Promise<OASettings[]> {
        return this.oaSettingsRepository.find();
    }
}
