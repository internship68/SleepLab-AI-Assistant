import { Injectable } from '@nestjs/common';
import { UserContext, ConversationState } from '../../../shared/types';
import { ScreeningHandler } from '../handlers/screening.handler';
import { FAQHandler } from '../handlers/faq.handler';
import { ContactHandler } from '../handlers/contact.handler';
import { GreetingHandler } from '../handlers/greeting.handler';
import { SleepLabHandler } from '../handlers/sleep-lab.handler';
import { CPAPHandler } from '../handlers/cpap.handler';
import { ElderlyHandler } from '../handlers/elderly.handler';
import { ConversationService } from '../services/conversation.service';

/** Menu selections: match letter (A/B/C/D/E) or Thai keyword */
const MENU_MAP: Record<string, ConversationState> = {
    // A — Screening
    'a': ConversationState.SCREENING_Q1,
    'ประเมินความเสี่ยง': ConversationState.SCREENING_Q1,
    'นอนกรน': ConversationState.SCREENING_Q1,
    // B — Sleep Lab
    'b': ConversationState.SLEEP_LAB,
    'sleep lab': ConversationState.SLEEP_LAB,
    'นัดหมาย': ConversationState.SLEEP_LAB,
    'sleep test': ConversationState.SLEEP_LAB,
    // C — CPAP
    'c': ConversationState.CPAP,
    'cpap': ConversationState.CPAP,
    'หน้ากาก': ConversationState.CPAP,
    // D — Elderly
    'd': ConversationState.ELDERLY,
    'ผู้สูงอายุ': ConversationState.ELDERLY,
    // E — Contact
    'e': ConversationState.CONTACT_STAFF,
    'ติดต่อเจ้าหน้าที่': ConversationState.CONTACT_STAFF,
    'แอดมิน': ConversationState.CONTACT_STAFF,
    'คุยกับคน': ConversationState.CONTACT_STAFF,
};

@Injectable()
export class MessageRouter {
    constructor(
        private readonly greetingHandler: GreetingHandler,
        private readonly screeningHandler: ScreeningHandler,
        private readonly faqHandler: FAQHandler,
        private readonly sleepLabHandler: SleepLabHandler,
        private readonly cpapHandler: CPAPHandler,
        private readonly elderlyHandler: ElderlyHandler,
        private readonly contactHandler: ContactHandler,
        private readonly conversationService: ConversationService,
    ) { }

    async route(message: string, context: UserContext): Promise<string> {
        const lower = message.toLowerCase().trim();

        // ── Greeting triggers ────────────────────────────────
        const isGreeting = ['สวัสดี', 'hi', 'hello', 'start', 'เริ่ม'].some(g => lower.includes(g));
        if (isGreeting || context.state === ConversationState.START) {
            return this.greetingHandler.handle(message, context);
        }

        // ── Screening flow — answer to Q1/Q2/Q3 ─────────────
        if ([ConversationState.SCREENING_Q1, ConversationState.SCREENING_Q2, ConversationState.SCREENING_Q3].includes(context.state)) {
            return this.screeningHandler.handle(message, context);
        }

        // ── Menu selection detection ─────────────────────────
        const selectedState = this.detectMenu(lower);
        if (selectedState) {
            await this.conversationService.updateContext(context.userId, { state: selectedState });
            const updatedContext = { ...context, state: selectedState };

            if (selectedState === ConversationState.SCREENING_Q1) {
                return this.screeningHandler.start(updatedContext);
            }
            if (selectedState === ConversationState.SLEEP_LAB) {
                return this.sleepLabHandler.handle(message, updatedContext);
            }
            if (selectedState === ConversationState.CPAP) {
                return this.cpapHandler.handle(message, updatedContext);
            }
            if (selectedState === ConversationState.ELDERLY) {
                return this.elderlyHandler.handle(message, updatedContext);
            }
            if (selectedState === ConversationState.CONTACT_STAFF) {
                return this.contactHandler.handle(message, updatedContext);
            }
        }

        // ── Contextual follow-up based on current state ──────
        switch (context.state) {
            case ConversationState.SLEEP_LAB:
                return this.sleepLabHandler.handle(message, context);
            case ConversationState.CPAP:
                return this.cpapHandler.handle(message, context);
            case ConversationState.ELDERLY:
                return this.elderlyHandler.handle(message, context);
            case ConversationState.CONTACT_STAFF:
                return this.contactHandler.handle(message, context);
            case ConversationState.SCREENING_DONE:
            case ConversationState.FAQ:
            default:
                // RAG fallback for any free-text question
                return this.faqHandler.handle(message, context);
        }
    }

    private detectMenu(lower: string): ConversationState | null {
        for (const [key, state] of Object.entries(MENU_MAP)) {
            if (lower === key || lower.includes(key)) {
                return state;
            }
        }
        return null;
    }
}
