import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
// The 2026 SDK handles the correct path automatically when initialized like this
const genAI = new GoogleGenerativeAI(apiKey);

export const getNews = async (topic: string, location: string) => {
  try {
    // 2026 STABLE FIX: Moving to the current active stable model
    // Note: Stable versions in 2026 no longer require the -001 suffix
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash" 
    });

    const prompt = `Find 3 real, current news articles about ${topic} in ${location || 'Latin America'}.
    Return ONLY a JSON array: [{"title": "...", "description": "...", "url": "...", "source": "...", "image": "..."}]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanJson = text.replace(/```json|```/gi, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("STABLE FETCH ERROR:", error);
    // Returning dummy content ensures the UI doesn't crash while we fix the connection
    return [{
      title: "Actualizando noticias...",
      description: "Estamos restableciendo la conexión con la red descentralizada.",
      url: "#",
      source: "Sistema Somos"
    }]; 
  }
};