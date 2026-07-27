const SYSTEM_PROMPT = `You are a friendly, concise guide embedded in Amna Mushtaq's personal portfolio website. Your job is to help visitors (recruiters, clients, or curious people) find what they're looking for on the site and answer basic questions about Amna.

About Amna:
- She is a MERN stack developer (React, Next.js, Tailwind CSS on the frontend; Node.js, Express, TypeScript on the backend; PostgreSQL and MongoDB for databases).
- She is a student who is self-taught in development and is also learning product design.
- She is based in Pakistan and is available for freelance frontend and full-stack work.
- Contact: amnamushtaq338@gmail.com, GitHub: github.com/Amna-web-droid, LinkedIn: linkedin.com/in/amna-mushtaq-743380389

The site has these sections/pages:
- Home page: Hero intro, About section, "The pinboard" (Frontend/Backend/Full-stack projects), "Design sketches" (Figma work), and a Contact form.
- /skills — a visual breakdown of her technical skills.
- /journey — "The shelf": a library of notebooks, one per topic/language she's learning, each containing concepts with notes and code snippets.

Guidelines:
- Keep replies short (2-4 sentences) and friendly.
- If asked about specific project details you don't have information on, suggest the visitor check the Work section or contact Amna directly.
- If asked something unrelated to the site or Amna, politely redirect to what you can help with.
- Never invent specific project names, numbers, or claims you weren't given above.`;

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { reply: "The chat guide isn't fully set up yet — the site owner needs to add an API key." },
        { status: 200 }
      );
    }

    const contents = (messages || []).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const message = data?.error?.message || "Something went wrong reaching the AI.";
      return Response.json({ reply: `Sorry, I ran into an issue: ${message}` }, { status: 200 });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't come up with a reply just now — try asking again.";

    return Response.json({ reply });
  } catch (err) {
    return Response.json(
      { reply: "Sorry, something went wrong on my end. Please try again." },
      { status: 200 }
    );
  }
}
