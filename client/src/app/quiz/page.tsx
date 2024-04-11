"use client";

import React, { useState } from "react";
import Question from "@/components/quiz/Question";
import { PageFrame } from "@/components/structural/PageFrame";
import QuizHeader from "@/components/quiz/Header";
import { quizData } from "@/utils/data";

type Question = {
  id: string;
  questionTitle: string;
  questionType: string;
  questionOptions: string[];
  questionAnswer: string;
  questionMark: number;
};

export const Quiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const onSelectAnswer = (questionId: string, selectedAnswer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const submitAnswersToBackend = async () => {
    const answersArray = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      }),
    );

    // Answer struct should be
    // [
    //   {
    //     "questionId": "question1",
    //     "answer": "Paris"
    //   },
    //   {
    //     "questionId": "question2",
    //     "answer": "It's a process by which plants use sunlight to synthesize foods..."
    //   }
    // ]

    //TODO: send answer and to backend
  };

  return (
    <PageFrame title="Quiz">
      <div className="flex flex-col space-y-4 pt-8 pb-16 pl-16 pr-16 m-auto max-w-[1200px]">
        <QuizHeader
          title={quizData.title}
          description={quizData.description}
          endDate={quizData.dueDate ?? ""}
          onSubmit={submitAnswersToBackend}
        />
        {quizData.questions.map((question) => (
          <Question
            key={question.id}
            title={question.title}
            type={question.type}
            options={JSON.parse(question.options ?? "[]")}
            mark={question.points}
            onSelectAnswer={(selectedAnswer) =>
              onSelectAnswer(question.id, selectedAnswer)
            }
          />
        ))}
      </div>
    </PageFrame>
  );
};

export default Quiz;
