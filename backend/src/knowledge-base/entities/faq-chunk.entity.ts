import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('faq_chunks')
export class FaqChunk {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    content: string;

    // Uses pgvector extensions. Ensure the database has `CREATE EXTENSION IF NOT EXISTS vector;` run.
    @Column({ type: 'vector', length: 1536, nullable: true })
    embedding: number[];

    @Column({ type: 'varchar', length: 255, nullable: true })
    source: string;
}
