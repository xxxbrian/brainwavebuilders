"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { examData } from "@/utils/data"; // get fake questions info
import { examSubmission } from "@/utils/data"; // get fake submission info
import { MarkQestion } from "@/components/assessment/MarkQuestion";

type Scores = Record<string, number>; // <Qid, score>

export const MarkExamPage: React.FC = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [scores, setScores] = useState<Scores>({});
  const [totalScore, setTotalScore] = useState<number>(0);

  useEffect(() => {
    const newTotalScore = Object.values(scores).reduce(
      (sum, score) => sum + (score || 0),
      0,
    );
    setTotalScore(newTotalScore);
  }, [scores]);
  const handleScoreChange = (questionId: string, score: number) => {
    setScores((prevScores) => ({ ...prevScores, [questionId]: score }));
  };

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/marking\/[^\/]+/, "");
    router.push(newPath);
  }, [pathName, router]);

  const onClickSave = useCallback(async () => {
    // TODO: Handle saving the scores and feedback to the backend
    const newPath = pathName.replace(/\/marking\/[^\/]+/, "");
    router.push(newPath);
  }, [pathName, router]);

  // TODO change to use real submission, combine submission's answer with question and sample answer
  const saqQuestions = examData.questions
    .filter((question) => question.type === "SAQ")
    .map((question) => ({
      ...question,
      studentAnswer:
        examSubmission.answers[
          question.id as keyof typeof examSubmission.answers
        ],
      sampleAnswer: question.answer,
    }));

  return (
    <div className="flex flex-col p-8 m-auto max-w-[1200px] space-y-4">
      <div className="flex items-center font-bold" onClick={onClickBack}>
        <button className="text-xl" onClick={(e) => e.stopPropagation()}>
          <IoIosArrowBack />
        </button>
        <span className="cursor-pointer">Back</span>
      </div>
      {saqQuestions.map((question) => (
        <MarkQestion
          key={question.id}
          title={question.title}
          points={question.points}
          studentAnswer={question.studentAnswer}
          sampleAnswer={question.sampleAnswer}
          onScoreChange={(score) => handleScoreChange(question.id, score)}
        />
      ))}
      <div className="flex justify-end">
        <button
          onClick={onClickSave}
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MarkExamPage;
