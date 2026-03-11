/**
 * ลบข้อมูลทดสอบจาก DB
 * รัน: npx ts-node --project tsconfig.json scripts/db/clear-test-data.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function main() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: true },
    });

    await client.connect();
    console.log('🔌 Connected to database\n');

    // ลบ oa_settings placeholder
    const r1 = await client.query(`
        DELETE FROM oa_settings
        WHERE channel_access_token LIKE 'TOKEN_REPLACE_%'
           OR channel_access_token = ''
           OR channel_secret LIKE 'SECRET_REPLACE_%'
    `);
    console.log(`  ✅ Deleted ${r1.rowCount ?? 0} placeholder rows from oa_settings`);

    // ลบ faq_chunks ทั้งหมด
    await client.query('TRUNCATE TABLE faq_chunks');
    console.log('  ✅ Truncated faq_chunks');

    await client.end();
    console.log('\n✅ Test data cleared!');
}

main().catch(err => {
    console.error('❌', err.message);
    process.exit(1);
});
