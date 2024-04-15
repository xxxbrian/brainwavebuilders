"use client";

import React, { useCallback, useState } from "react";
import QuizHeader from "@/components/quiz/Header";
import { quizData } from "@/utils/data";
import { usePathname, useRouter } from "next/navigation";
import { JSONContent } from "novel";
import AdvancedEditor from "@/components/editor/AdvancedEditor";
import { IoIosArrowBack } from "react-icons/io";

export const Assignment: React.FC = () => {
  const router = useRouter();

  const pathName = usePathname();

  const [content, setContent] = useState<JSONContent>({
    type: "doc",
    content: [],
  });
  // This content is used to record assignment content. Send this to backend

  const submitAnswersToBackend = useCallback(async () => {
    const newPath = pathName.replace(/\/attendassignment\/[^\/]+/, "");
    router.push(newPath);
    //TODO: send assignment
  }, [pathName, router]);

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/attendassignment\/[^\/]+/, "");
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
        <AdvancedEditor
          className="border rounded-md overflow-y-auto overflow-x-hidden border-gray-300 p-12 px-8 sm:px-12"
          value={content}
          setValue={setContent}
        />
      </div>
    </div>
  );
};

export default Assignment;
