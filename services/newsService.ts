import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey, "v1");

export const getNews = async (topic: string, location: string) => {
  try {
    console.log(`STABLE FETCH: Topic=${topic}, Location=${location}`);
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Find 3 recent news articles about ${topic} in ${location}. 
    Return them as a JSON array with: title, description, url, and source.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // This cleans the AI response if it wraps it in markdown code blocks
    const cleanJson = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("STABLE FETCH ERROR:", error);
    return [];
  }
};