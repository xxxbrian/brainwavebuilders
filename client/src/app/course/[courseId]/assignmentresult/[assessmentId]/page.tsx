"use client";

import React, { useCallback, useState, useEffect } from "react";
import AdvancedEditor from "@/components/editor/AdvancedEditor";
import { mockEditorContent } from "@/utils/data";
import { Heading } from "@radix-ui/themes";
import { TextArea } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { useBackend } from "@/hooks/useBackend";
import { Submission } from "@/backend";

export const MarkAssignmentPage: React.FC = () => {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState("");
  const [mark, setMark] = useState(0);
  const backend = useBackend();
  const router = useRouter();
  const pathName = usePathname();
  const pathSegments = pathName.split("/");
  const submissionId = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    const fetchSubmissionData = async () => {
      if (submissionId) {
        try {
          const data = await backend.fetchSubmission({ submissionId });
          setSubmission({
            ...data.submission,
            assignmentContent: JSON.parse(
              data.submission.assignmentContent ?? "{}",
            ),
          });
          setFeedback(data.submission.feedback ?? "");
          setMark(data.submission.grade ?? 0);
        } catch (error) {
          console.error("Failed to fetch submission data:", error);
        }
      }
    };

    void fetchSubmissionData();
  }, [submissionId, backend]);

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/assignmentresult\/[^\/]+/, "");
    router.push(newPath);
  }, [pathName, router]);

  if (!submission) return <div>Loading submission...</div>;

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
          <AdvancedEditor
            value={submission.assignmentContent}
            isEditable={false}
          />
        </div>
        <div className="w-1/3 border-2 rounded-r-md flex flex-col space-y-4 p-2">
          <Heading color="indigo" className="p-2">
            Mark
          </Heading>
          <p className="px-2">{mark}/100</p>
          <Heading color="indigo" className="p-2">
            Feedback
          </Heading>
          <TextArea
            size="3"
            className="h-full bg-white"
            variant="surface"
            value={feedback}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default MarkAssignmentPage;
