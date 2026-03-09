import { MessageHandler } from './handler.interface';
import { UserContext } from '../../../shared/types';
export declare class GreetingHandler implements MessageHandler {
    handle(message: string, context: UserContext): Promise<string>;
}
