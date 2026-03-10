import { Injectable } from '@nestjs/common';

@Injectable()
export class PromptBuilder {
    buildMedicalPrompt(question: string, context: string): string {
        return `
You are a medical assistant chatbot.
Answer ONLY from the provided context.
If the information is not found, reply that the system does not have information and suggest contacting staff.
Do not generate medical advice beyond the provided data.

Context:
${context}

Question:
${question}

Answer:
    `;
    }
}
