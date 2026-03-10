import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function main() {
    const sqlPath = path.resolve(__dirname, 'add-oa-settings.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    await client.connect();
    console.log('🔌 Connected to Neon\n');

    const statements = sql.split(';').map(s => s.trim()).filter(s => s.length > 5);
    for (const stmt of statements) {
        try {
            const result = await client.query(stmt);
            const tag = result.command ?? 'OK';
            console.log(`  ✅ ${tag}  — ${stmt.substring(0, 60).replace(/\s+/g, ' ')}`);
            if (result.rows?.length) result.rows.forEach(r => console.log('     📋', JSON.stringify(r)));
        } catch (err: any) {
            console.log(`  ⚠️  ${err.message}`);
        }
    }

    await client.end();
    console.log('\n✅ OA Settings table ready!');
}

main().catch(err => { console.error(err.message); process.exit(1); });
