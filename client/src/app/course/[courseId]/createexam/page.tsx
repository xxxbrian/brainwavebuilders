"use client";

import React, { useCallback, useState } from "react";
import AssessmentInfo from "@/components/assessment/AssessmentInfo";
import QuestionComponent from "@/components/assessment/Question";
import { usePathname, useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useBackend } from "@/hooks/useBackend";
import { useCourse } from "@/contexts/CourseContext";
import { IoIosArrowBack } from "react-icons/io";
import { NewQuestion } from "@/backend";

interface Question extends NewQuestion {
  id: string;
}

export const CreateExamPage: React.FC = () => {
  const router = useRouter();

  const backend = useBackend();

  const courseId = useCourse().id;

  const pathName = usePathname();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate, setStartDate] = useState("");

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: uuidv4(),
      title: "",
      type: "short_answer",
      options: ["", "", ""],
      answer: "",
      points: 1,
    },
  ]);

  const onClickSave = useCallback(async () => {
    // TODO: Send exam info to backend
    const preparedQuestions = questions.map(
      ({ id, title, type, options, answer, points }) => ({
        title,
        type,
        options,
        answer,
        points,
      }),
    );

    // Send exam info to the backend
    await backend.createAssessment({
      title: title,
      description: description,
      courseId: courseId,
      startDate: startDate,
      dueDate: endDate,
      type: "exam",
      questions: preparedQuestions,
    });

    const newPath = pathName.replace(/\/createexam$/, "");
    router.push(newPath);
  }, [
    title,
    description,
    courseId,
    questions,
    startDate,
    endDate,
    pathName,
    router,
    backend,
  ]);

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/createexam$/, "");
    router.push(newPath);
  }, [pathName, router]);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      title: "",
      type: "short_answer",
      options: ["", "", ""],
      answer: "",
      points: 1,
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

  return (
    <div className="flex flex-col space-y-4 pt-8 pb-16 pl-16 pr-16 m-auto max-w-[1200px] ">
      <div className="flex items-center font-bold" onClick={onClickBack}>
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
          title={question.title}
          type={question.type}
          options={question.options}
          answer={question.answer ?? ""}
          mark={question.points}
          onTitleChange={(title) =>
            updateQuestion(index, { ...question, title: title })
          }
          onTypeChange={(type) =>
            updateQuestion(index, { ...question, type: type })
          }
          onOptionsChange={(options) =>
            updateQuestion(index, { ...question, options: options })
          }
          onAnswerChange={(answer) =>
            updateQuestion(index, { ...question, answer: answer })
          }
          onMarkChange={(mark) =>
            updateQuestion(index, { ...question, points: mark })
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
