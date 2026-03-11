import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { OASettings } from '../entities/oa-settings.entity';
export declare class OASettingsService {
    private readonly oaSettingsRepository;
    private readonly configService;
    constructor(oaSettingsRepository: Repository<OASettings>, configService: ConfigService);
    getSettings(lineOaId: string): Promise<OASettings | null>;
    getCenterName(lineOaId: string): Promise<string>;
    getAllOAs(): Promise<OASettings[]>;
}
