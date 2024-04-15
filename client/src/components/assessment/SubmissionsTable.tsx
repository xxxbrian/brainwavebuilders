import React from "react";
import { FaRegPenToSquare } from "react-icons/fa6";
import { Table } from "@radix-ui/themes";
import { Heading } from "@radix-ui/themes";
import { Assessment, Submission } from "@/backend";

interface SubmissionsTableProps {
  submissions: Submission[];
  onClickMark: (submissionId: string) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  onClickMark,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not submitted";
    const date = new Date(dateString);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

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
          {submissions.map((submission) => (
            <Table.Row key={submission.id}>
              <Table.RowHeaderCell>
                {submission.studentId}
              </Table.RowHeaderCell>
              {formatDate(submission.submittedAt)}
              <Table.Cell>
                {submission.grade !== undefined ? (
                  `${submission.grade}/100`
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
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default SubmissionsTable;
