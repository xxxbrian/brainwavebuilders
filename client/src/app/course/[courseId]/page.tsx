"use client";

import { CalendarBoard } from "@/components/calendar/CalendarBoard";
import { StatefulInviteMembersForm } from "@/components/course/InviteMembersForm";
import { Heading } from "@radix-ui/themes";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import { MdSchedule, MdForum, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { useCourse } from "@/contexts/CourseContext";
import { useBackend } from "@/hooks/useBackend";
import { Assessment } from "@/backend";
import { CalendarBoardMini } from "@/components/calendar/CalendarBoardMini";
import AssessmentTable from "@/components/assessment/AssessmentsTable";
import { CreateAssignmentDialog } from "@/components/assessment/CreateAssignmentDialog";
import { type Event } from "@/components/calendar/Calendar";
import { WithTeacherRole } from "@/contexts/CourseRoleContext";
import { WithStudentRole } from "@/contexts/CourseRoleContext";
import StudentAssesmentTable from "@/components/assessment/StudentAssessmentTable";
import { ScheduleCourseForm } from "@/components/course/ScheduleCourseForm";
import App from "next/app";
import { BiBook } from "react-icons/bi";

interface ApplicationProps {
  icon: React.ReactNode;
  title: string;
  onClick?: (title: string) => void;
}

const ApplicationIcon: React.FC<ApplicationProps> = ({
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

const CoursesPage: React.FC = ({}) => {
  const router = useRouter();

  const course = useCourse();

  const pathName = usePathname();

  const backend = useBackend();

  const [events, setEvents] = useState<Record<string, Event[]>>({});

  useEffect(() => {
    const inner = async () => {
      if (!course.id) {
        return;
      }
      const { events } = await backend.getCourseEvents({ courseId: course.id });
      setEvents(events);
    };

    void inner();
  }, [backend, course.id]);

  const onClickAssignments = useCallback(async () => {
    router.push(`${pathName}/assignments`);
  }, [pathName, router]);

  const onClickForum = useCallback(async () => {
    router.push(`${pathName}/forum`);
  }, [pathName, router]);

  const onClickDrive = useCallback(async () => {
    router.push(`${pathName}/drive/${course.id}`);
  }, [pathName, router, course.id]);

  interface AssignmentProps {
    id: string;
    name: string;
    startDate: string;
    dueDate: string;
    totalPoints: number;
  }

  const [isCreateAssignment, setIsCreateAssignment] = useState(false);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [assignmentsData, setAssignmentsData] = useState<AssignmentProps[]>([]);
  const [examsData, setExamsData] = useState<AssignmentProps[]>([]);

  const formatAssessmentProps = useCallback(
    (assessment: Assessment): AssignmentProps => ({
      id: assessment.id,
      name: assessment.title,
      startDate: assessment.startDate ?? "",
      dueDate: assessment.dueDate ?? "",
      totalPoints: assessment.totalPoints ?? 100,
    }),
    [],
  );

  const fetchAssessments = useCallback(async () => {
    try {
      const response = await backend.fetchAssessments({ courseId: course.id });
      setAssessments(response.assessments);
      setAssignmentsData(
        response.assessments
          .filter((ass) => ass.type === "assignment")
          .map(formatAssessmentProps),
      );
      setExamsData(
        response.assessments
          .filter((ass) => ass.type === "exam")
          .map(formatAssessmentProps),
      );
    } catch (error) {
      console.error("Failed to fetch assessments:", error);
    }
  }, [backend, course.id, formatAssessmentProps]);

  useEffect(() => {
    const inner = async () => {
      await fetchAssessments();
    };
    void inner();
  }, [backend, course.id, fetchAssessments]);

  const handleUpdateAssignments = useCallback(async () => {
    await fetchAssessments();
  }, [fetchAssessments]);

  const onClickAssignment = useCallback(
    async (assessmentId: string) => {
      const newPath = `${pathName}/assignment/${assessmentId}`;
      router.push(newPath);
    },
    [router, pathName],
  );

  const onClickExam = useCallback(
    async (assessmentId: string) => {
      const newPath = `${pathName}/exam/${assessmentId}`;
      router.push(newPath);
    },
    [router, pathName],
  );

  const onAttendExam = useCallback(
    async (assessmentId: string) => {
      router.push(`${pathName}/attendexam/${assessmentId}`);
    },
    [router, pathName],
  );

  const onAttendAssignment = useCallback(
    async (assessmentId: string) => {
      router.push(`${pathName}/attendassignment/${assessmentId}`);
    },
    [router, pathName],
  );

  const viewAssignmentResult = useCallback(
    (submissionId: string) => {
      router.push(`${pathName}/assignmentresult/${submissionId}`);
    },
    [router, pathName],
  );

  const onClickAddExam = useCallback(async () => {
    router.push(`${pathName}/createexam`);
  }, [pathName, router]);

  const onClickAddAssignment = useCallback(() => {
    setIsCreateAssignment(true);
  }, []);

  const onClickManageMembers = useCallback(() => {
    router.push(`${pathName}/members`);
  }, [pathName, router]);

  const onClickCourseBooks = useCallback(() => {
    router.push(`${pathName}/books`);
  }, [pathName, router]);

  return (
    <div className="flex flex-col space-y-8 px-4 py-4">
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
              <WithTeacherRole>
                <ScheduleCourseForm course={course}>
                  <ApplicationIcon
                    icon={<MdSchedule />}
                    title="Schedule Class"
                  />
                </ScheduleCourseForm>
              </WithTeacherRole>

              <ApplicationIcon
                icon={<MdForum />}
                title="Forum"
                onClick={onClickForum}
              />

              <WithTeacherRole>
                <ApplicationIcon
                  icon={<MdOutlinePersonAddAlt1 />}
                  title="Manage Members"
                  onClick={onClickManageMembers}
                />
              </WithTeacherRole>

              <ApplicationIcon
                icon={<FaFileUpload />}
                title="File Drive"
                onClick={onClickDrive}
              />

              <ApplicationIcon
                icon={<BiBook />}
                title="Course Books"
                onClick={onClickCourseBooks}
              />
            </div>
          </div>
        </div>
        <div className="w-2/3 space-y-4 overflow-hidden">
          <Heading size={"5"}>Calendar</Heading>
          <CalendarBoard
            today={new Date()}
            events={events}
            warpperClassName="hidden xl:block flex-shrink-0"
          />
          <CalendarBoardMini
            today={new Date()}
            events={events}
            warpperClassName="xl:hidden"
          />
        </div>
      </div>
      <WithTeacherRole>
        <AssessmentTable
          assignments={assignmentsData}
          type="Assignment"
          onClickAddButton={onClickAddAssignment}
          onClickAsessment={onClickAssignment}
        />
        <AssessmentTable
          assignments={examsData}
          type="Exam"
          onClickAddButton={onClickAddExam}
          onClickAsessment={onClickExam}
        />
        <CreateAssignmentDialog
          isOpen={isCreateAssignment}
          setIsOpen={setIsCreateAssignment}
          onUpdateAssignments={handleUpdateAssignments}
        />
      </WithTeacherRole>
      <WithStudentRole>
        <StudentAssesmentTable
          assignments={assignmentsData}
          type="Assignment"
          onClickAsessment={onAttendAssignment}
          viewAssignmentResult={viewAssignmentResult}
        />
        <StudentAssesmentTable
          assignments={examsData}
          type="Exam"
          onClickAsessment={onAttendExam}
          viewAssignmentResult={viewAssignmentResult}
        />
        <CreateAssignmentDialog
          isOpen={isCreateAssignment}
          setIsOpen={setIsCreateAssignment}
          onUpdateAssignments={handleUpdateAssignments}
        />
      </WithStudentRole>
    </div>
  );
};

export default CoursesPage;
