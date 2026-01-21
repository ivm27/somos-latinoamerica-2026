import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

export const getNews = async (language: string, topic: string, location: string) => {
  // FIX: Force the use of the stable "v1" API instead of v1beta
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // Specify the stable model version
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Find 3 real news articles about ${topic} in ${location || 'Latin America'}.
    Write the response in this language: ${language}.
    Return ONLY a JSON array with this structure: 
    [{"title": "...", "description": "...", "url": "...", "source": "...", "image": "..."}]`;

    // The library will now default to the stable v1 endpoint
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().replace(/```json|```/gi, "").trim();
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};