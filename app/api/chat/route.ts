import { business } from "@/lib/business";

type ChatMessage = { role: "user" | "assistant"; content: string };

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: CORS });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function POST(req: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return json({ error: "The chatbot isn't configured yet (missing GROQ_API_KEY)." }, 500);
  }

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const recent = messages.slice(-8).map((m) => ({ role: m.role, content: m.content }));

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.LLM_MODEL || "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 500,
        messages: [{ role: "system", content: business.systemInfo }, ...recent],
      }),
    });

    if (!res.ok) {
      return json({ error: "The assistant is unavailable right now." }, 502);
    }

    const data = await res.json();
    const reply: string =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't find an answer to that. Please call or email us and we'll help!";

    return json({ reply });
  } catch {
    return json({ error: "The assistant is unavailable right now." }, 502);
  }
}
