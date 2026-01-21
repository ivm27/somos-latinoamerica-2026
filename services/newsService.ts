import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const getNews = async (language: string, topic: string) => {
  // Use the standard constructor which defaults to the stable v1 API
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // This model is now fully supported on the stable track
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Find 3 real news articles about ${topic} in ${language}. 
    Return ONLY JSON: [{"title": "...", "description": "...", "url": "...", "source": "...", "image": "..."}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/gi, "").trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
};