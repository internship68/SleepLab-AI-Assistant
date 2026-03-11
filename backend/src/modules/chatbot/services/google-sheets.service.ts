import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { UserContext } from '../../../shared/types';
import { LineClient } from '../../line/line.client';

@Injectable()
export class GoogleSheetsService {
    private readonly logger = new Logger(GoogleSheetsService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly lineClient: LineClient,
    ) { }

    private isEnabled(): boolean {
        const creds = this.configService.get<string>('googleSheets.credentialsPath') ||
            process.env.GOOGLE_APPLICATION_CREDENTIALS;
        const spreadsheetId = this.configService.get<string>('googleSheets.spreadsheetId');
        return !!(creds && spreadsheetId);
    }

    async logScreeningResult(
        context: UserContext,
        result: 'High Risk' | 'Low Risk',
        score: number,
        recommendation: string,
        displayName?: string,
    ): Promise<void> {
        if (!this.isEnabled()) {
            this.logger.debug('[Sheets] Skipped (not configured)');
            return;
        }

        try {
            const name = displayName ?? (await this.lineClient.getDisplayName(context.lineUserId)) ?? '-';
            const auth = new google.auth.GoogleAuth({
                keyFile: this.configService.get<string>('googleSheets.credentialsPath') ||
                    process.env.GOOGLE_APPLICATION_CREDENTIALS,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });
            const sheets = google.sheets({ version: 'v4', auth });
            const spreadsheetId = this.configService.get<string>('googleSheets.spreadsheetId');
            const sheetName = this.configService.get<string>('googleSheets.sheetName') ?? '';
            // ชื่อชีตภาษาไทยทำให้ API parse ผิด — ใช้ A:F (ชีตแรก) เมื่อชื่อมี non-ASCII
            const range = sheetName && /^[a-zA-Z0-9_\s]+$/.test(sheetName)
                ? `'${sheetName}'!A:F`
                : 'A:F';

            const row: string[] = [
                new Date().toISOString(),
                context.lineUserId,
                name,
                result,
                String(score),
                recommendation,
            ];

            await sheets.spreadsheets.values.append({
                spreadsheetId,
                range,
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS',
                requestBody: { values: [row] },
            });

            this.logger.log(`[Sheets] Logged screening: ${context.lineUserId} → ${result}`);
        } catch (err) {
            this.logger.warn(`[Sheets] Failed to log: ${(err as Error).message}`);
        }
    }
}
