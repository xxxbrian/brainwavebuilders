"use client";

import React, { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { MarkQestion } from "@/components/assessment/MarkQuestion";
import { useBackend } from "@/hooks/useBackend";
import { Submission } from "@/backend";
import { Assessment } from "@/backend";

type Scores = Record<string, number>; // <Qid, score>

export const MarkExamPage: React.FC = () => {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [scores, setScores] = useState<Scores>({});
  const [totalScore, setTotalScore] = useState<number>(0);
  const pathName = usePathname();
  const router = useRouter();
  const backend = useBackend();

  const pathSegments = pathName.split('/');
  const submissionId = pathSegments[pathSegments.length - 1];
  const assessmentId = pathSegments[pathSegments.length - 3];


  useEffect(() => {
    const fetchDetailsAndSubmission = async () => {
      if (assessmentId) {
        try {
          const response = await backend.fetchAssessmentDetailsTeacher({ assessmentId });
          setAssessment(response.assessment);
        } catch (error) {
          console.error('Failed to fetch assessment details:', error);
        }
      }
      if (submissionId) {
        try {
          const { submission } = await backend.fetchSubmission({ submissionId });
          setSubmission(submission);
        } catch (error) {
          console.error("Failed to fetch submission:", error);
        }
      }
    };

    fetchDetailsAndSubmission();
  }, [submissionId, assessmentId, backend]);

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

  console.log(scores);
  console.log(totalScore);

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/marking\/[^\/]+/, "");
    router.push(newPath);
  }, [pathName, router]);

  const onClickSave = useCallback(async () => {
    if (submissionId) {
      try {
        await backend.manualGradeSubmission({
          submissionId,
          saqGrades: totalScore
        });
        alert('Total SAQ scores successfully saved!');
        const newPath = pathName.replace(/\/marking\/[^\/]+/, "");
        router.push(newPath);
      } catch (error) {
        console.error("Failed to save total SAQ scores:", error);
      }
    }
  }, [backend, submissionId, totalScore, router, pathName]);

  if (!assessment || !submission) return <div>Loading...</div>;

  const saqQuestions = assessment.questions
    .filter((question) => question.type === "SAQ")
    .map((question) => ({
      ...question,
      studentAnswer: submission.answers[question.id],
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
          sampleAnswer={question.sampleAnswer || "No sample answer provided"}
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
