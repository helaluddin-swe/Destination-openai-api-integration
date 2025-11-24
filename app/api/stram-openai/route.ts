import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = await streamText({
      model: openai("gpt-4.1-nano"),
      prompt,
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("error generate text", error);
    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
}
