"use client";

import React, { useState } from "react";
import AssessmentInfo from "@/components/assessment/AssessmentInfo";
import QuestionComponent from "@/components/assessment/Question";
import { PageFrame } from "@/components/structural/PageFrame";
import { v4 as uuidv4 } from "uuid";

type Question = {
  id: string;
  questionTitle: string;
  questionType: string;
  questionOptions: string[];
  questionAnswer: string;
  questionMark: number;
};

export const Assessment: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(60);
  const [startDate, setStartDate] = useState("");

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: uuidv4(),
      questionTitle: "",
      questionType: "short_answer",
      questionOptions: ["", "", ""],
      questionAnswer: "",
      questionMark: 1,
    },
  ]);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      questionTitle: "",
      questionType: "short_answer",
      questionOptions: ["", "", ""],
      questionAnswer: "",
      questionMark: 1,
    };
    setQuestions(questions.concat(newQuestion));
  };

  const updateQuestion = (index: number, question: Question) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1, question);
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  console.log(questions);
  return (
    <PageFrame title="Assessment">
      <div className="flex flex-col space-y-4 pt-8 pb-16 pl-16 pr-16 m-auto max-w-[1200px]">
        <AssessmentInfo
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          duration={duration}
          setDuration={setDuration}
          startDate={startDate}
          setStartDate={setStartDate}
        />
        {questions.map((question, index) => (
          <QuestionComponent
            key={question.id}
            title={question.questionTitle}
            type={question.questionType}
            options={question.questionOptions}
            answer={question.questionAnswer}
            mark={question.questionMark}
            onTitleChange={(title) =>
              updateQuestion(index, { ...question, questionTitle: title })
            }
            onTypeChange={(type) =>
              updateQuestion(index, { ...question, questionType: type })
            }
            onOptionsChange={(options) =>
              updateQuestion(index, { ...question, questionOptions: options })
            }
            onAnswerChange={(answer) =>
              updateQuestion(index, { ...question, questionAnswer: answer })
            }
            onMarkChange={(mark) =>
              updateQuestion(index, { ...question, questionMark: mark })
            }
            onDelete={() => handleDeleteQuestion(question.id)}
          />
        ))}
        <div className="flex">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90">
            Save
          </button>
        </div>
        <button
          onClick={handleAddQuestion}
          className="fixed bottom-4 right-4 flex items-center justify-center w-20 h-20 text-5xl text-blue-500 rounded-full shadow-xl bg-gray-50"
        >
          +
        </button>
      </div>
    </PageFrame>
  );
};

export default Assessment;
