"use client";

import React, { useState, useCallback } from "react";
import Question from "@/components/quiz/Question";
import QuizHeader from "@/components/quiz/Header";
import { quizData } from "@/utils/data";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

type Question = {
  id: string;
  questionTitle: string;
  questionType: string;
  questionOptions: string[];
  questionAnswer: string;
  questionMark: number;
};

export const Quiz: React.FC = () => {
  const router = useRouter();

  const pathName = usePathname();

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const onSelectAnswer = (questionId: string, selectedAnswer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer,
    }));
  };

  const submitAnswersToBackend = useCallback(async () => {
    const answersArray = Object.entries(answers).map(
      ([questionId, answer]) => ({
        questionId,
        answer,
      }),
    ); // Combine questions with its answer for you to send to backend

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

    const newPath = pathName.replace(/\/attendexam\/[^\/]+/, "");
    router.push(newPath);
    //TODO: send answer and to backend
  }, [pathName, router, answers]);

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/attendexam\/[^\/]+/, "");
    router.push(newPath);
  }, [pathName, router]);

  return (
    <div>
      <div className="flex flex-col space-y-4 pt-8 pl-8 pr-8 m-auto max-w-[1200px]">
        <div className="flex items-center font-bold" onClick={onClickBack}>
          <button className="text-xl" onClick={(e) => e.stopPropagation()}>
            <IoIosArrowBack />
          </button>
          <span className="cursor-pointer">Back</span>
        </div>
        <QuizHeader
          title={quizData.title}
          description={quizData.description}
          endDate={quizData.dueDate ?? ""}
          onSubmit={submitAnswersToBackend}
        />
        {quizData.questions.map((question) => (
          <Question
            key={question.id}
            id={question.id}
            title={question.title}
            type={question.type}
            options={JSON.parse(String(question.options ?? "[]"))}
            mark={question.points}
            onSelectAnswer={(selectedAnswer) =>
              onSelectAnswer(question.id, selectedAnswer)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Quiz;
