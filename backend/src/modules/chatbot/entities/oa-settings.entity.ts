import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

/**
 * LINE OA Settings — one row per OA (6 total)
 * Stores per-OA center name and LINE credentials.
 */
@Entity('oa_settings')
export class OASettings {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    /** Matches channelId from LINE webhook */
    @Column({ name: 'line_oa_id', length: 255, unique: true })
    lineOaId: string;

    /** Display name of the sleep center, e.g. "SMD Sappaya" */
    @Column({ name: 'center_name', length: 255 })
    centerName: string;

    /** LINE Channel Access Token for this OA */
    @Column({ name: 'channel_access_token', type: 'text' })
    channelAccessToken: string;

    /** LINE Channel Secret for this OA */
    @Column({ name: 'channel_secret', length: 255 })
    channelSecret: string;
}
