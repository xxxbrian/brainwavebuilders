"use client";

import { CalendarBoard } from "@/components/calendar/CalendarBoard";
import { StatefulInviteMembersForm } from "@/components/course/InviteMembersForm";
import { Heading } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { MdAssignment, MdForum, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { mockTime, mockEvents } from "@/utils/data";
import { useCourse } from "@/contexts/CourseContext";
import { CalendarBoardMini } from "@/components/calendar/CalendarBoardMini";
import AssignmentsTable from "@/components/assessment/AssessmentsTable";
import { AssessmentsData } from "@/utils/data";
import { CreateAssignmentDialog } from "@/components/assessment/CreateAssignmentDialog";

interface ApplicationProps {
  icon: React.ReactNode;
  title: string;
  onClick?: (title: string) => void;
}

export const ApplicationIcon: React.FC<ApplicationProps> = ({
  icon,
  title,
  onClick,
}) => {
  const onclickInner = useCallback(() => {
    onClick?.(title);
  }, [onClick, title]);

  return (
    <div
      className="flex flex-col space-y-4 justify-center w-36 h-36 bg-gray-100 items-center rounded-md select-none cursor-pointer flex-shrink-0 m-2"
      onClick={onclickInner}
    >
      <div className="bg-indigo-500 w-fit h-fit p-3 text-white rounded-md text-4xl">
        {icon}
      </div>
      <div className="text-xs uppercase text-gray-600">{title}</div>
    </div>
  );
};

export const CoursesPage: React.FC = ({}) => {
  const router = useRouter();

  const course = useCourse();

  const pathName = usePathname();

  const onClickAssignments = useCallback(async () => {
    router.push(`${pathName}/assignments`);
  }, [pathName, router]);

  const onClickForum = useCallback(async () => {
    router.push(`${pathName}/forum`);
  }, [pathName, router]);

  const [isCreateAssignment, setIsCreateAssignment] = useState(false);

  const onClickAssignment = useCallback(
    (assessmentId: string) => {
      router.push(`${pathName}/assignment/${assessmentId}`);
    },
    [router, pathName],
  );

  const onClickExam = useCallback(
    (assessmentId: string) => {
      router.push(`${pathName}/exam/${assessmentId}`);
    },
    [router, pathName],
  );

  const onClickAddExam = useCallback(async () => {
    router.push(`${pathName}/createexam`);
  }, [pathName, router]);

  const onClickAddAssignment = () => {
    setIsCreateAssignment(true);
  };

  const assignmentsData = AssessmentsData.filter(
    (assessment) => assessment.type !== "exam",
  ).map((assessment) => ({
    id: assessment.id,
    name: assessment.title,
    startDate: assessment.startDate ?? "",
    dueDate: assessment.dueDate ?? "",
  }));

  const examsData = AssessmentsData.filter(
    (assessment) => assessment.type === "exam",
  ).map((assessment) => ({
    id: assessment.id,
    name: assessment.title,
    startDate: assessment.startDate ?? "",
    dueDate: assessment.dueDate ?? "",
  }));

  return (
    <div className="flex flex-col space-y-8">
      <div
        className="bg-orange-800 border border-gray-400 rounded-lg py-8 px-12 flex flex-col space-y-2 min-h-60 justify-end text-white bg-opacity-80"
        style={{
          background: course.imageURL ? `url(${course.imageURL})` : "",
        }}
      >
        {course.code && (
          <Heading className="text-white" size={"4"}>
            {course.code}
          </Heading>
        )}
        <Heading className="text-white" size={"8"}>
          {course.name}
        </Heading>

        <div>{course.description}</div>
      </div>
      <div className="flex space-x-4">
        <div className="flex flex-col space-y-4 w-1/3">
          <Heading size={"5"}>Course Applications</Heading>
          <div className="flex flex-wrap">
            <div className="flex flex-wrap">
              <ApplicationIcon
                icon={<MdAssignment />}
                title="Assignments"
                onClick={onClickAssignments}
              />

              <ApplicationIcon
                icon={<MdForum />}
                title="Forum"
                onClick={onClickForum}
              />

              <StatefulInviteMembersForm course={course}>
                <ApplicationIcon
                  icon={<MdOutlinePersonAddAlt1 />}
                  title="Invite Member"
                />
              </StatefulInviteMembersForm>
            </div>
          </div>
        </div>
        <div className="w-2/3 space-y-4 overflow-hidden">
          <Heading size={"5"}>Calendar</Heading>
          <CalendarBoard
            today={mockTime}
            events={mockEvents()}
            warpperClassName="hidden xl:block flex-shrink-0"
          />
          <CalendarBoardMini
            today={mockTime}
            events={mockEvents()}
            warpperClassName="xl:hidden"
          />
        </div>
      </div>
      <AssignmentsTable
        assignments={assignmentsData}
        type="Assignment"
        onClickAddButton={onClickAddAssignment}
        onClickAsessment={onClickAssignment}
      />
      <AssignmentsTable
        assignments={examsData}
        type="Exam"
        onClickAddButton={onClickAddExam}
        onClickAsessment={onClickExam}
      />
      <CreateAssignmentDialog
        isOpen={isCreateAssignment}
        setIsOpen={setIsCreateAssignment}
      />
    </div>
  );
};

export default CoursesPage;
