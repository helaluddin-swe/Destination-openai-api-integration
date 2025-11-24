import {GoogleGenAI} from '@google/genai';
import dotenv from "dotenv"
dotenv.config()
export async function POST(req:Request){


const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const {prompt}=await req.json()
const response = await ai.models.generateContentStream({
  model: "gemini-2.0-flash",
  contents: prompt
});
let text = "";
for await (const chunk of response) {
  console.log(chunk.text);
  text += chunk.text;
}
}