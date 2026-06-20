import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { subject, topics, examDate } = await req.json();

    if (!subject || !topics || !examDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const today = new Date().toISOString().split("T")[0];

    const prompt = `Create a detailed day-by-day study plan.

Subject: ${subject}
Topics to cover: ${topics}
Today's date: ${today}
Exam date: ${examDate}

Instructions:
- Break the plan into days from today until the exam date
- Distribute topics evenly across the available days
- Include short daily goals and 1-2 practice suggestions per day
- Keep it concise and practical
- Format using clear day-by-day headings like "Day 1:", "Day 2:" etc.`;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.5,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", errText);
      return NextResponse.json(
        { error: "AI generation failed" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const plan = data.choices[0].message.content;

    return NextResponse.json({ plan });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}