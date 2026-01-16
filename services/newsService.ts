import { GoogleGenerativeAI } from "@google/generative-ai";

// 1. FORCING STABLE V1 (v1beta causes 404 for Gemini 3)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey, "v1");

export const getNews = async (topic: string, location: string) => {
  try {
    console.log(`STABLE FETCH: Topic=${topic}, Location=${location}`);
    
    // 2. USING STABLE PRODUCTION MODEL
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Find 3 recent news articles about ${topic} in ${location || 'Latin America'}. 
    Return ONLY a valid JSON array of objects with keys: "title", "description", "url", "source". 
    No markdown, no backticks.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // 3. Clean and Parse
    const cleanJson = text.replace(/```json|```|json/gi, "").trim();
    const data = JSON.parse(cleanJson);
    
    console.log("FETCH SUCCESS:", data);
    return data;

  } catch (error) {
    console.error("STABLE FETCH ERROR:", error);
    return []; 
  }
};