"use client";

import React, { useCallback, useState } from "react";
import AssessmentInfo from "@/components/assessment/AssessmentInfo";
import QuestionComponent from "@/components/assessment/Question";
import { usePathname, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { IoIosArrowBack } from "react-icons/io";

type Question = {
  id: string;
  questionTitle: string;
  questionType: string;
  questionOptions: string[];
  questionAnswer: string;
  questionMark: number;
};

export const CreateExamPage: React.FC = () => {
  const router = useRouter();

  const pathName = usePathname();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const onClickSave = useCallback(async () => {
    // TODO: Send exam info to backend
    const newPath = pathName.replace(/\/createexam$/, "");
    router.push(newPath);
  }, [pathName, router]);

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/createexam$/, "");
    router.push(newPath);
  }, [pathName, router]);

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
    <div
      className="flex flex-col space-y-4 pt-8 pb-16 pl-16 pr-16 m-auto max-w-[1200px] "
      onClick={onClickBack}
    >
      <div className="flex items-center font-bold">
        <button className="text-xl" onClick={(e) => e.stopPropagation()}>
          <IoIosArrowBack />
        </button>
        <span className="cursor-pointer">Back</span>
      </div>

      <AssessmentInfo
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        endDate={endDate}
        setEndDate={setEndDate}
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
        <button
          onClick={onClickSave}
          className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90"
        >
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
  );
};

export default CreateExamPage;
