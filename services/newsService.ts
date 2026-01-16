import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with the STABLE v1 endpoint (required in 2026)
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey, "v1");

export const getNews = async (topic: string, location: string) => {
  try {
    console.log(`STABLE FETCH: Topic=${topic}, Location=${location}`);
    
    // Using the 2026 workhorse model
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash" });

    const prompt = `Find 3 recent news articles about ${topic} in ${location || 'Latin America'}. 
    Return ONLY a valid JSON array of objects with these keys: title, description, url, source. 
    Do not include markdown formatting or the word "json".`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean potential markdown or "json" labels that cause JSON.parse to fail
    const cleanJson = text.replace(/```json|```|json/gi, "").trim();
    
    const data = JSON.parse(cleanJson);
    console.log("FETCH SUCCESS:", data);
    return data;

  } catch (error) {
    // If this hits, the news cards disappear because an empty array is returned
    console.error("STABLE FETCH ERROR:", error);
    return []; 
  }
};