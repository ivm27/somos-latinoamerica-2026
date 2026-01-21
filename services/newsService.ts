import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// The 'GoogleGenAI' class defaults to the stable production v1 API
const ai = new GoogleGenAI({ apiKey });

export const getNews = async (language: string, topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash', // Stable model on production track
      contents: [{
        role: 'user',
        parts: [{ text: `Find 3 news articles about ${topic} in ${language}. Return ONLY JSON.` }]
      }]
    });

    // In the new SDK, response.text() is the standard for stable v1
    const text = response.text().replace(/```json|```/gi, "").trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("News Error:", error);
    return [];
  }
};