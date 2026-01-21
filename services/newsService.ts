import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

export const getNews = async (language: string, topic: string) => {
  try {
    // This uses the stable v1 endpoint for 2026
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: [{ role: 'user', parts: [{ text: `Find 3 news items for ${topic} in ${language}. Return JSON.` }] }]
    });
    // Fix: In the new SDK, .text() is a function
    const text = response.text().replace(/```json|```/gi, "").trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};