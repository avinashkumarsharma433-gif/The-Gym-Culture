import { GoogleGenAI } from "@google/genai";

// Initialization with platform-managed API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing. AI Trainer will not be able to respond.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key' });

const SYSTEM_INSTRUCTION = `You are "The Gym Culture" AI Coach. 
Your goal is to help users with fitness, nutrition, and general gym queries.
Be professional, motivating, and helpful. 
You are specifically representing "The Gym Culture" (TGC), a premium gym chain.
If asked about locations, pricing, or franchise, guide them to use our website links or contact our team via WhatsApp.
Keep your responses concise and gym-focused.
If a user is feeling demotivated, give them a strong boost of confidence!`;

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const sendMessageToGemini = async (history: ChatMessage[], message: string) => {
  try {
    const chat = ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const result = await chat;
    return result.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("I hit a small glitch in my training. Try asking again!");
  }
};
