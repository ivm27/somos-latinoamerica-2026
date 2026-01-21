import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const getNews = async (language: string, topic: string, location: string) => {
  // We specify the stable connection to fix the 404 error
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Find 3 real news articles about ${topic} in ${location || 'Latin America'}.
    Write the response in: ${language}.
    Return ONLY JSON: [{"title": "...", "description": "...", "url": "...", "source": "...", "image": "..."}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text().replace(/```json|```/gi, "").trim());
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};