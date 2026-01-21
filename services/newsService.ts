// NEW: Import from the stable 2026 SDK you just installed
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the client directly with the API key
const ai = new GoogleGenAI({ apiKey });

export const getNews = async (language: string, topic: string) => {
  try {
    // This call now correctly uses the stable v1 path automatically
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{
        role: 'user',
        parts: [{ text: `Find 3 recent news articles about ${topic} in ${language}. 
                         Return ONLY a JSON array: [{"title": "...", "description": "...", "url": "...", "source": "...", "image": "..."}]` }]
      }]
    });

    // Extract the text content from the new response format
    const text = response.text.replace(/```json|```/gi, "").trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("News Fetch Error:", error);
    return [];
  }
};