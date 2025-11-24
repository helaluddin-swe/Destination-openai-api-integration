import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    // NEW RESPONSE STRUCTURE
    const text =
      result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response";

    return Response.json({ text });
  } catch (error) {
    console.error("error generate text", error);
    return Response.json(
      { error: "Failed to generate text" },
      { status: 500 }
    );
  }
}
