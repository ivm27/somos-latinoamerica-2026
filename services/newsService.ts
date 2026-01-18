import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const getNews = async (topic: string, location: string) => {
  // We initialize INSIDE the function to ensure fresh configuration every call
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // Explicitly requesting the v1 stable model path
    const model = genAI.getGenerativeModel(
      { model: "gemini-1.5-flash" },
      { apiVersion: 'v1' } 
    );

    const prompt = `Find 3 real news articles about ${topic} in ${location || 'Latin America'}.
    Return ONLY a JSON array: [{"title": "...", "description": "...", "url": "...", "source": "..."}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return JSON.parse(text.replace(/```json|```/gi, "").trim());
  } catch (error) {
    console.error("STABLE FETCH ERROR:", error);
    return []; 
  }
};