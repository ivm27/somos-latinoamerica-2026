import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const getNews = async (language: string, topic: string) => {
  // FIX: Using the stable Gemini v1 version to avoid 404 errors
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Find 3 news articles about ${topic} in ${language}. Return ONLY JSON.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text().replace(/```json|```/gi, "").trim());
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};