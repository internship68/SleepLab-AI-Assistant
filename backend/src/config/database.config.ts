import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
    // Neon provides a full connection URL; TypeORM supports it directly.
    url: process.env.DATABASE_URL,

    // Individual fields as fallback (used if DATABASE_URL is not set)
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}));
