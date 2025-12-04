import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize the Gemini API client
// Note: In a production environment, ensure process.env.API_KEY is properly set.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Sends a prompt to the Gemini model and returns the text response.
 * @param prompt The user's input text.
 * @returns The generated response text.
 */
export const generateResponse = async (prompt: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        systemInstruction: "You are a helpful, concise, and friendly AI assistant. Keep your answers clear and to the point.",
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating content:", error);
    return "An error occurred while communicating with the AI. Please try again later.";
  }
};