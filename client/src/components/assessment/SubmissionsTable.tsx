import React, { useState, useEffect } from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Table } from "@radix-ui/themes";
import { Heading } from "@radix-ui/themes";
import { Submission, User, Assessment } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
import { usePathname } from "next/navigation";

interface SubmissionsTableProps {
  submissions: Submission[];
  onClickMark: (submissionId: string) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  onClickMark,
}) => {
  const backend = useBackend();
  const [studentDetails, setStudentDetails] = useState<
    Record<string, User | undefined>
  >({});
  const [assessmentDetails, setAssessmentDetails] = useState<Assessment | null>(
    null,
  );
  const pathName = usePathname();

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not submitted";
    const date = new Date(dateString);
    const year = date.getUTCFullYear().toString().slice(2);
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}-${hours}:${minutes}`;
  };

  const fetchAssessmentDetails = async () => {
    const pathSegments = pathName.split("/");
    const assessmentId = pathSegments[pathSegments.length - 1];
    if (assessmentId) {
      try {
        const details = await backend.fetchAssessmentDetailsTeacher({
          assessmentId,
        });
        setAssessmentDetails(details.assessment);
        console.log("Assessment Details:", details.assessment); // Logging the assessment details
      } catch (error) {
        console.error("Failed to fetch assessment details:", error);
      }
    }
  };

  useEffect(() => {
    fetchAssessmentDetails();
    const fetchStudentDetails = async () => {
      const studentInfoPromises = submissions.map((submission) =>
        backend
          .getUserInfoByID({ id: submission.studentId })
          .then((response) => {
            return { id: submission.studentId, user: response.user };
          })
          .catch((error) => {
            console.error(
              "Failed to fetch user details for student:",
              submission.studentId,
              error,
            );
            return { id: submission.studentId, user: undefined };
          }),
      );

      const results = await Promise.all(studentInfoPromises);
      const detailsMap = results.reduce<Record<string, User | undefined>>(
        (acc, current) => {
          acc[current.id] = current.user;
          return acc;
        },
        {},
      );

      setStudentDetails(detailsMap);
    };

    void fetchStudentDetails();
  }, [submissions, backend]);

  if (!submissions || !assessmentDetails)
    return <div>Loading assessment details...</div>;

  return (
    <div>
      <Heading color="indigo" className="p-2">
        Recieved Submissions
      </Heading>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row className="font-bold text-lg">
            <Table.ColumnHeaderCell>Student Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Submitted Time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Grade</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {submissions.length > 0 ? (
            submissions.map((submission) => (
              <Table.Row key={submission.id}>
                <Table.RowHeaderCell>
                  {submission && studentDetails[submission.studentId]
                    ? `${studentDetails[submission.studentId]
                        ?.firstName} ${studentDetails[submission.studentId]
                        ?.lastName}`
                    : "Unknown Student"}
                </Table.RowHeaderCell>
                <Table.Cell>{formatDate(submission.submittedAt)}</Table.Cell>
                <Table.Cell>
                  {submission.grade !== undefined ? (
                    `${submission.grade}/${
                      assessmentDetails.totalPoints ?? 100
                    }`
                  ) : (
                    <span className="text-red-500">Not marked yet</span>
                  )}
                </Table.Cell>
                <Table.Cell
                  className="cursor-pointer"
                  onClick={() => onClickMark(submission.id)}
                >
                  <FaRegPenToSquare />
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={4} className="text-center">
                There is no Submission
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default SubmissionsTable;
