"use client";

import React, { useCallback, useState, useEffect } from "react";
import QuizHeader from "@/components/quiz/Header";
import { usePathname, useRouter } from "next/navigation";
import { JSONContent } from "novel";
import AdvancedEditor from "@/components/editor/AdvancedEditor";
import { IoIosArrowBack } from "react-icons/io";
import { useBackend } from "@/hooks/useBackend";
import { Assessment, Submission } from "@/backend";

export const Assignment: React.FC = () => {
  const router = useRouter();
  const backend = useBackend();

  const pathName = usePathname();
  const pathSegments = pathName.split("/");
  const assessmentId = pathSegments[pathSegments.length - 1];

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [content, setContent] = useState<JSONContent>({
    type: "doc",
    content: [],
  });

  useEffect(() => {
    if (assessmentId) {
      const fetchAssessment = async () => {
        if (assessmentId) {
          try {
            const response = await backend.fetchAssessmentDetailsStudent({
              assessmentId,
            });
            setAssessment(response.assessment);
          } catch (error) {
            console.error("Failed to fetch assessment details:", error);
          }
        }
      };

      fetchAssessment();
    }
  }, [assessmentId, backend]);

  const submitAssignmentToBackend = useCallback(async () => {
    if (assessmentId) {
      try {
        await backend.submitAssignment({
          assessmentId,
          assignmentContent: JSON.stringify(content),
        });
        alert("Assignment submitted successfully!");
        const newPath = pathName.replace(/\/attendassignment\/[^\/]+/, "");
        router.push(newPath);
      } catch (error) {
        console.error("Failed to submit assignment:", error);
        alert("Failed to submit assignment, please try again!");
      }
    } else {
      alert("No assignment ID provided");
    }
  }, [assessmentId, content, backend, pathName, router]);

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/attendassignment\/[^\/]+/, "");
    router.push(newPath);
  }, [pathName, router]);

  if (!assessment) return <div>Loading assessment details...</div>;

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
          title={assessment.title}
          description={assessment.description || "No description available"}
          endDate={assessment.dueDate || "Due date not set"}
          onSubmit={submitAssignmentToBackend}
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
