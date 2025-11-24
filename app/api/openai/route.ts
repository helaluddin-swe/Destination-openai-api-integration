import {openai} from "@ai-sdk/openai"
import { generateText } from "ai"
import dotenv from "dotenv"
dotenv.config()
export async function POST(req:Request){
    
   try{  const {prompt}=await req.json()
   
    const {text}=await generateText({
        model:openai("gpt-4.1-nano"),
        prompt
    })
    return Response.json({text})
}
catch(error){
    console.error("error generate text",error)
    return Response.json({error:"Failed to generate text"},{status:500})
}

}