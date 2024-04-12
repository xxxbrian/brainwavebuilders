"use client";

import React, { useState, useCallback } from "react";
import AdvancedEditor from "@/components/editor/AdvancedEditor";
import { mockEditorContent } from "@/utils/data";
import { Heading } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export const MarkAssignmentPage: React.FC = () => {
  const [feedback, setFeedback] = useState("");
  const [mark, setMark] = useState(0);

  // TODO: Need a fetch submissionById function here to get real submission
  // You can get the assessment Id on router

  const handleMarkChange = (newMark: number) => {
    if (newMark >= 0) {
      setMark(newMark);
    }
  };

  const router = useRouter();

  const pathName = usePathname();

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/marking\/[^\/]+/, "");
    router.push(newPath);
  }, [pathName, router]);

  const onClickSave = useCallback(async () => {
    // TODO: Send mark and feedback to backend
    const newPath = pathName.replace(/\/marking\/[^\/]+/, "");
    router.push(newPath);
  }, [pathName, router]);

  return (
    <div className="flex flex-col p-8 m-auto max-w-[1200px] space-y-4">
      <div className="flex items-center font-bold" onClick={onClickBack}>
        <button className="text-xl" onClick={(e) => e.stopPropagation()}>
          <IoIosArrowBack />
        </button>
        <span className="cursor-pointer">Back</span>
      </div>
      <div className="flex flex-wrap">
        <div className="w-2/3 border-2 p-2 rounded-l-md border-r-0">
          <AdvancedEditor value={mockEditorContent} isEditable={false} />
        </div>
        <div className="w-1/3 border-2 rounded-r-md flex flex-col space-y-4 p-2">
          <Heading color="indigo" className="p-2">
            Mark
          </Heading>
          <div className="flex flex-wrap justify-start">
            <input
              id="mark"
              type="text"
              value={mark}
              onChange={(e) => {
                handleMarkChange(Number(e.target.value));
              }}
              className="p-2 border w-20 rounded-md"
            />
            <div className="flex flex-col h-full">
              <button
                type="button"
                onClick={() => handleMarkChange(mark + 1)}
                className="p-1 text-blue-700 h-2/5 text-lg"
              >
                <GoTriangleUp />
              </button>
              <button
                type="button"
                onClick={() => handleMarkChange(mark - 1)}
                className="p-1 text-blue-700 h-1/2 text-lg"
              >
                <GoTriangleDown />
              </button>
            </div>
          </div>

          <Heading color="indigo" className="p-2">
            Feedback
          </Heading>
          <TextArea
            size="3"
            className="h-full"
            variant="surface"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Type your feedback here..."
          />
          <button
            className="bg-blue-700 text-white p-2 font-medium rounded-md"
            onClick={onClickSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAssignmentPage;
