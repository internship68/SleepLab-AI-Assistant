import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ConversationState } from '../../../shared/types';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'line_user_id', length: 255 })
    lineUserId: string;

    @Column({ name: 'line_oa_id', length: 255 })
    lineOaId: string;

    @Column({
        type: 'varchar',
        length: 50,
        default: ConversationState.START,
    })
    state: string;

    @Column({ name: 'screening_step', nullable: true })
    screeningStep: string;

    /** running count of "ใช่" answers during screening */
    @Column({ name: 'screening_score', type: 'int', default: 0 })
    screeningScore: number;

    @Column({ name: 'last_message', type: 'text', nullable: true })
    lastMessage: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Unique per user per OA
    static uniqueKey = ['lineUserId', 'lineOaId'];
}
