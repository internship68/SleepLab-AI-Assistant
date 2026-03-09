import { UserContext } from '../../../shared/types';
import { ScreeningHandler } from '../handlers/screening.handler';
import { FAQHandler } from '../handlers/faq.handler';
import { ContactHandler } from '../handlers/contact.handler';
import { GreetingHandler } from '../handlers/greeting.handler';
export declare class MessageRouter {
    private readonly screeningHandler;
    private readonly faqHandler;
    private readonly contactHandler;
    private readonly greetingHandler;
    constructor(screeningHandler: ScreeningHandler, faqHandler: FAQHandler, contactHandler: ContactHandler, greetingHandler: GreetingHandler);
    route(message: string, context: UserContext): Promise<string>;
    private isGreeting;
    private isContactStaff;
}
