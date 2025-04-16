'use client';

import { useEffect, useState } from 'react';

interface Props {
  question: string;
  answer: string;
  forceShow?: boolean;
}

export function QuestionCard({ question, answer, forceShow = false }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(forceShow);
  }, [forceShow]);

  return (
    <div className="border p-4 rounded-2xl shadow-sm mb-4">
      <p className="font-semibold">Q: {question}</p>
      {show && <p className="mt-2 text-muted-foreground">A: {answer}</p>}
      {!forceShow && (
        <button
          onClick={() => setShow((prev) => !prev)}
          className="mt-2 text-blue-500 underline text-sm"
        >
          {show ? 'Hide Answer' : 'Show Answer'}
        </button>
      )}
    </div>
  );
}
