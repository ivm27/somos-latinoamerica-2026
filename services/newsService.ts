import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey, "v1");

export const getNews = async (topic: string, location: string) => {
  try {
    console.log(`STABLE FETCH: Topic=${topic}, Location=${location}`);
    
    // We move the strict formatting rules into the model configuration for better reliability
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const prompt = `ACT AS: A professional news curator for a Latin American audience.
    TASK: Find 3 REAL, EXISTING news articles about "${topic}" in "${location || 'Latin America'}".
    
    STRICT RULES:
    1. Only provide REAL URLs from major news outlets (e.g., El País, BBC Mundo, CNN en Español, Infobae). 
    2. DO NOT hallucinate or guess URLs. If a URL is not verified, do not include the article.
    3. The language of the content must match: ${topic === 'Español' ? 'Spanish' : 'English'}.
    
    OUTPUT FORMAT: Return ONLY a JSON array of 3 objects. No markdown.
    SCHEMA:
    [
      {
        "title": "Exact headline of the article",
        "description": "A 2-sentence summary of the news",
        "url": "https://actual-working-url.com",
        "source": "Name of News Outlet",
        "image": "https://actual-article-image-url.com"
      }
    ]`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean and Parse with extra safety for 2026 model behavior
    const cleanJson = text.replace(/```json|```|json/gi, "").trim();
    const data = JSON.parse(cleanJson);
    
    // Final verification: Ensure every object has the required keys
    const validatedData = data.filter((item: any) => item.title && item.url);
    
    console.log("FETCH SUCCESS & VALIDATED:", validatedData);
    return validatedData;

  } catch (error) {
    console.error("STABLE FETCH ERROR:", error);
    return []; 
  }
};