import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// FORCE V1: This is critical for 2026 free tier stability
const genAI = new GoogleGenerativeAI(apiKey, "v1");

export const getNews = async (topic: string, location: string) => {
  try {
    // Switching back to 1.5-flash because it has the most generous free quota in 2026
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `Find 3 real news articles about ${topic} in ${location || 'Latin America'}.
    Return ONLY a JSON array. 
    Format: [{"title": "...", "description": "...", "url": "...", "source": "..."}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text().replace(/```json|```/gi, "").trim());

  } catch (error: any) {
    if (error.message?.includes('429')) {
      console.error("QUOTA EXCEEDED: Waiting for cooldown...");
    }
    console.error("STABLE FETCH ERROR:", error);
    return []; 
  }
};