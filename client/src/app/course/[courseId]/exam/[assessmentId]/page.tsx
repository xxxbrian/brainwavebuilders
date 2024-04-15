"use client";

import React, { useCallback } from "react";
import { examData } from "../../../../../../utils/data";
import AssessmentHeader from "../../../../../../components/assessment/AssessmentHeader";
import SubmissionsTable from "../../../../../../components/assessment/SubmissionsTable";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export const AssignmentSubmissionOverviewPage: React.FC = () => {
  const submissionsWithNames = examData.submissions.map((submission) => ({
    id: submission.id,
    // need to use getUserNameById instead of using id dirctly
    studentName: submission.studentId,
    submittedAt: submission.submittedAt,
    grade: submission.grade,
  }));

  const router = useRouter();

  const pathName = usePathname();

  const onClickMark = useCallback(
    async (submissionId: string) => {
      router.push(`${pathName}/marking/${submissionId}`);
    },
    [router, pathName],
  );

  const onClickBack = useCallback(() => {
    const newPath = pathName.replace(/\/exam\/[^\/]+/, "");
    router.push(newPath);
  }, [pathName, router]);

  return (
    <div className="flex flex-col space-y-4 pt-8 pb-16 pl-16 pr-16 m-auto max-w-[1200px]">
      <div className="flex items-center font-bold" onClick={onClickBack}>
        <button className="text-xl" onClick={(e) => e.stopPropagation()}>
          <IoIosArrowBack />
        </button>
        <span className="cursor-pointer">Back</span>
      </div>
      <AssessmentHeader
        title={examData.title}
        description={examData.description}
        startDate={examData.startDate}
        endDate={examData.dueDate}
      />
      <SubmissionsTable
        submissions={submissionsWithNames}
        onClickMark={onClickMark}
      />
    </div>
  );
};

export default AssignmentSubmissionOverviewPage;
