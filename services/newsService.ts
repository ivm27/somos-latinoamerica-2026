import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const getNews = async (language: string, topic: string, location: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // We explicitly tell the AI which language to write the title and description in
    const prompt = `Find 3 real news articles about ${topic} in ${location || 'Latin America'}.
    Write the response in the following language: ${language}.
    Return ONLY a JSON array: [{"title": "...", "description": "...", "url": "...", "source": "...", "image": "..."}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text().replace(/```json|```/gi, "").trim());
  } catch (error) {
    console.error("Fetch Error:", error);
    return [];
  }
};