"use client";

import React, { useCallback, useState, useEffect } from "react";
import AssessmentHeader from "@/components/assessment/AssessmentHeader";
import SubmissionsTable from "@/components/assessment/SubmissionsTable";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { useBackend } from "@/hooks/useBackend";
import { Assessment, Submission } from "@/backend";

const AssignmentSubmissionOverviewPage: React.FC = () => {
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const backend = useBackend();
  const router = useRouter();
  const pathName = usePathname();
  const pathSegments = pathName.split("/");
  const assessmentId = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    if (assessmentId) {
      console.log("hello");
      const fetchDetails = async () => {
        try {
          const assessmentDetails = await backend.fetchAssessmentDetailsTeacher(
            { assessmentId },
          );
          console.log("empty");
          console.log(assessmentDetails);
          setAssessment(assessmentDetails.assessment);
          const submissionsResponse = await backend.fetchAssessmentSubmissions({
            assessmentId,
          });
          setSubmissions(submissionsResponse.submissions);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };

      void fetchDetails();
    }
  }, [pathName, backend, assessmentId]);

  const onClickMark = useCallback(
    async (submissionId: string) => {
      router.push(`${pathName}/marking/${submissionId}`);
    },
    [router, pathName],
  );

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/assignment\/[^\/]+/, "");
    router.push(newPath);
  }, [pathName, router]);

  if (!assessment) return <div>Loading assessment details...</div>;

  return (
    <div className="flex flex-col space-y-4 pt-8 pb-16 pl-16 pr-16 m-auto max-w-[1200px]">
      <div className="flex items-center font-bold" onClick={onClickBack}>
        <button className="text-xl" onClick={(e) => e.stopPropagation()}>
          <IoIosArrowBack />
        </button>
        <span className="cursor-pointer">Back</span>
      </div>
      <AssessmentHeader
        title={assessment.title}
        description={assessment.description ?? "No description available"}
        startDate={assessment.startDate ?? "Start date not set"}
        endDate={assessment.dueDate ?? "Due date not set"}
      />
      <SubmissionsTable submissions={submissions} onClickMark={onClickMark} />
    </div>
  );
};

export default AssignmentSubmissionOverviewPage;
