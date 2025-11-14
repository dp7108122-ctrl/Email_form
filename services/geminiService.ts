
import { GoogleGenAI } from "@google/genai";
import type { FormData } from '../types';

// IMPORTANT: Do NOT hardcode the API key in the code.
// This assumes the API key is set in the environment variables.
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
}
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a polite and friendly confirmation email content using the Gemini API.
 * 
 * @param formData - The user's submitted form data.
 * @returns A promise that resolves to the generated email content string.
 */
export const generateConfirmationEmail = async (formData: FormData): Promise<string> => {
    const model = 'gemini-2.5-flash';
    
    // Construct a detailed prompt for the AI
    const prompt = `
        You are a friendly customer support assistant. A user has just submitted a contact form on our website. 
        Your task is to generate the body of a polite and professional automatic reply email to this user.

        The email must contain the following elements:
        1. A friendly greeting using the user's name.
        2. A "thank you" message for contacting us.
        3. A confirmation that their message has been received.
        4. Set the expectation that we will respond within a specific timeframe (e.g., "within 24-48 business hours").
        5. A summary of the details they submitted, for their records.
        6. A polite closing.

        Here is the user's submitted data:
        - Name: ${formData.name}
        - Email: ${formData.email}
        - Message: "${formData.message}"

        Please generate only the plain text content for the email body. Do not include a subject line or any headers.
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error(`Error generating confirmation email with Gemini:`, error);
        // Provide a fallback template in case the API call fails
        return `
            Hello ${formData.name},

            Thank you so much for reaching out to us!

            This is an automated confirmation that we have successfully received your message. Our team will review your inquiry and get back to you within 24-48 business hours.

            For your reference, here are the details you submitted:
            - Name: ${formData.name}
            - Email: ${formData.email}
            - Message: "${formData.message}"

            We appreciate your patience.

            Best regards,
            The Team
        `;
    }
};
