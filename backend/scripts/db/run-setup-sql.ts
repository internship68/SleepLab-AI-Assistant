/**
 * run-setup-sql.ts
 * Connects to Neon and executes scripts/db/setup.sql
 * Usage: npx ts-node scripts/db/run-setup-sql.ts
 */
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function main() {
    const sqlPath = path.resolve(__dirname, 'setup.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL is not set in .env');
        process.exit(1);
    }

    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    });

    console.log('🔌 Connecting to Neon...');
    await client.connect();
    console.log('   Connected ✅\n');
    console.log('🚀 Running setup.sql...\n');

    // Run by splitting on lines that end with semicolon (handles multi-line CREATE TABLE)
    const rawStatements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 5);

    for (const stmt of rawStatements) {
        const preview = stmt.replace(/\s+/g, ' ').substring(0, 70);
        try {
            const result = await client.query(stmt);
            const tag = result.command ?? 'OK';
            console.log(`  ✅ ${tag}  — ${preview}`);
            if (result.rows?.length) {
                for (const row of result.rows) {
                    console.log('     📋', JSON.stringify(row));
                }
            }
        } catch (err: any) {
            // "already exists" errors are expected on re-run (IF NOT EXISTS handles most)
            console.log(`  ⚠️  ${preview.substring(0, 60)}`);
            console.log(`     → ${err.message}`);
        }
    }

    await client.end();
    console.log('\n✅ Database setup complete!');
}

main().catch(err => {
    console.error('Fatal:', err.message);
    process.exit(1);
});
