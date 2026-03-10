import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserContext, ConversationState } from '../../../shared/types';
import { User } from '../entities/user.entity';
import { Conversation } from '../entities/conversation.entity';

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>,
    ) { }

    async getContext(lineUserId: string, lineOaId: string): Promise<UserContext> {
        let user = await this.userRepository.findOne({
            where: { lineUserId, lineOaId },
        });

        if (!user) {
            user = this.userRepository.create({
                lineUserId,
                lineOaId,
                state: ConversationState.START,
                screeningScore: 0,
            });
            await this.userRepository.save(user);
        }

        return {
            userId: user.id,
            lineUserId: user.lineUserId,
            lineOaId: user.lineOaId,
            state: user.state as ConversationState,
            screeningStep: user.screeningStep,
            screeningScore: user.screeningScore ?? 0,
            lastMessage: user.lastMessage,
        };
    }

    async updateContext(userId: string, updates: Partial<UserContext>): Promise<void> {
        const updateObj: any = {};
        if (updates.state !== undefined) updateObj.state = updates.state;
        if (updates.screeningStep !== undefined) updateObj.screeningStep = updates.screeningStep;
        if (updates.screeningScore !== undefined) updateObj.screeningScore = updates.screeningScore;
        if (updates.lastMessage !== undefined) updateObj.lastMessage = updates.lastMessage;
        await this.userRepository.update({ id: userId }, updateObj);
    }

    async saveMessage(userId: string, message: string, role: 'user' | 'assistant' | 'system'): Promise<void> {
        const conversation = this.conversationRepository.create({ userId, message, role });
        await this.conversationRepository.save(conversation);
    }
}
