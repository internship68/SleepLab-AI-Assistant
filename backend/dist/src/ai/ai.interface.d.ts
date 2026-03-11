export interface AIProvider {
    generate(prompt: string, context?: string): Promise<string>;
}
