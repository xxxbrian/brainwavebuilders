"use client";

import React, { useCallback } from "react";
import AdvancedEditor from "@/components/editor/AdvancedEditor";
import { mockEditorContent } from "@/utils/data";
import { Heading } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export const MarkAssignmentPage: React.FC = () => {
  // TODO: Need a fetch submissionById function here to get real submission
  // You can get the assessment Id on router
  const fake_feedback = "This is a fake feedback";
  const fake_mark = 85;

  const router = useRouter();

  const pathName = usePathname();

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/assignmentresult\/[^\/]+/, "");
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
          <p className="px-2">{fake_mark}/100</p>
          <Heading color="indigo" className="p-2">
            Feedback
          </Heading>
          <TextArea
            size="3"
            className="h-full bg-white"
            variant="surface"
            value={fake_feedback}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default MarkAssignmentPage;
