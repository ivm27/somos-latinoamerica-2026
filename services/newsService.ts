// FIX: Using the unified SDK (GoogleGenAI) instead of the legacy one
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// The 'GoogleGenAI' client defaults to the stable production v1 API
const ai = new GoogleGenAI({ apiKey });

export const getNews = async (language: string, topic: string) => {
  try {
    // This call will now hit the stable /v1/ endpoint automatically
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{
        role: 'user',
        parts: [{ text: `Find 3 news articles about ${topic} in ${language}. Return ONLY JSON.` }]
      }]
    });

    // Extracting the text from the new 2026 response object
    const text = response.text().replace(/```json|```/gi, "").trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("API Connection Error:", error);
    return [];
  }
};