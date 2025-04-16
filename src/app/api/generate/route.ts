import { getTriviaQuestions } from '@/lib/deepseek';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { keyword, difficulty } = await req.json();
  let raw = '';

  try {
    raw = await getTriviaQuestions(keyword, difficulty);
  } catch (error) {
    console.error("❌ Failed to fetch from DeepSeek:", error);
    return NextResponse.json(
      { error: 'Failed to generate questions. Please try again later.' },
      { status: 500 }
    );
  }
  
  console.log("🔍 DeepSeek raw output:\n", raw);

  if (!raw || typeof raw !== 'string') {
    return NextResponse.json({ data: [] });
  }

  const lines = raw
    .split('\n')
    .map(line => line.trim())
    .filter(line =>
      line &&
      !line.toLowerCase().startsWith('here are') &&
      !line.toLowerCase().startsWith('questions about') &&
      !line.startsWith('---')
    );

  const parsed = [];
  for (let i = 0; i < lines.length; i++) {
    const qMatch = lines[i].match(/(?:\*\*)?Q[\d]*:?\**\s*(.*)/i);
    const aMatch = lines[i + 1]?.match(/(?:\*\*)?A:?\**\s*(.*)/i);

    if (qMatch && aMatch) {
      const question = qMatch[1].trim();
      const answer = aMatch[1].trim();

      // Extra: ensure they’re not obviously broken
      if (question.length > 5 && answer.length > 1) {
        parsed.push({ question, answer });
        i++; // Skip the answer line next loop
      }
    }
  }

  return NextResponse.json({ data: parsed });
}