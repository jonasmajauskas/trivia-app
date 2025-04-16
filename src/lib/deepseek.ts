export async function getTriviaQuestions(keyword: string, difficulty: string) {
    const prompt = `
  Generate 10 trivia questions on the topic "${keyword}" at a "${difficulty}" difficulty level.
  Each question should follow this format:
  
  Q: [question]
  A: [answer]
  `;
  
    const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    });
  
    const json = await res.json();
    return json.choices?.[0]?.message?.content || '';
  }  