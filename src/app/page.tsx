'use client';

import { QuestionCard } from '@/components/QuestionCard';
import { Button } from '@/components/button';
import { Input } from '@/components/input'; // You need to add this component via shadcn-ui
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select';
import { useState } from 'react';

export default function HomePage() {
  const [keyword, setKeyword] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ keyword, difficulty }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setQuestions(data.data);
      } else {
        alert(data.error || 'Something went wrong. Try again.');
      }
    } catch (err) {
      alert('Network error. Please try again later.');
      console.error(err);
    }
    setLoading(false);
  };
  

  return (
    <main className="max-w-xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">🎯 Trivia Generator</h1>

      <Input
        placeholder="Enter a topic (e.g., Space, History, Animals)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mb-4"
      />

      <Select defaultValue="Easy" onValueChange={setDifficulty}>
        <SelectTrigger className="mb-4">
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent>
          {['Easy', 'Medium', 'Hard', 'Very Hard'].map((level) => (
            <SelectItem key={level} value={level}>
              {level}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={generate} disabled={!keyword || loading} className="mb-6">
        {loading ? 'Generating...' : 'Generate'}
      </Button>

      {questions.length > 0 && (
        <div className="mb-4">
          <Button variant="secondary" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Hide All Answers' : 'Show All Answers'}
          </Button>
        </div>
      )}

      <div className="mt-4">
        {questions.map((q, i) => (
          <QuestionCard
            key={i}
            question={q.question}
            answer={q.answer}
            forceShow={showAll}
          />
        ))}
      </div>
    </main>
  );
}