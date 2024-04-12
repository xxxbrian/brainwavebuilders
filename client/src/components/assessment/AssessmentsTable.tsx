import React, { useState, useEffect } from "react";
import { Heading } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";

interface AssignmentProps {
  id: string;
  name: string;
  startDate: string;
  dueDate: string;
}

interface AssignmentWithStatusProps extends AssignmentProps {
  isCompleted: boolean;
  status: "Not Start" | "In Progress" | "Completed";
}

// Define the prop types for the component
interface AssignmentsTableProps {
  assignments: AssignmentProps[];
  type: string;
  onClickAsessment: (assessmentId: string) => void;
  onClickAddButton: () => void;
}

// Component to display a table of assignments
const AssignmentsTable: React.FC<AssignmentsTableProps> = ({
  assignments,
  type,
  onClickAddButton,
  onClickAsessment,
}) => {
  const [sortedAssignments, setSortedAssignments] = useState<
    AssignmentWithStatusProps[]
  >([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}-${hours}:${minutes}`;
  };

  useEffect(() => {
    const now = new Date();

    const withStatusAndSorted = assignments
      .map((assignment) => {
        const start = new Date(assignment.startDate);
        const due = new Date(assignment.dueDate);
        let status: "Not Start" | "In Progress" | "Completed" = "In Progress";

        if (now > due) {
          status = "Completed";
        } else if (now < start) {
          status = "Not Start";
        }

        return {
          ...assignment,
          status,
          startDate: formatDate(assignment.startDate),
          dueDate: formatDate(assignment.dueDate),
        };
      })
      .sort((a, b) => {
        const statusOrder = { "In Progress": 1, "Not Start": 2, Completed: 3 };
        if (statusOrder[a.status] !== statusOrder[b.status]) {
          return statusOrder[a.status] - statusOrder[b.status];
        } else {
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        }
      });

    setSortedAssignments(
      withStatusAndSorted.map((assignment) => ({
        ...assignment,
        isCompleted: false, // or assign the appropriate value
      })),
    );
  }, [assignments]);

  // TODO: Use Id to navigate assignment from table
  return (
    <div>
      <div className="flex justify-between p-2">
        <Heading color="indigo">{type}</Heading>
        <button onClick={onClickAddButton}>+</button>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row className="font-bold text-lg">
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Start Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Due Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedAssignments.map((assignment) => (
            <Table.Row
              key={assignment.id}
              className="cursor-pointer"
              onClick={() => onClickAsessment(assignment.id)}
            >
              <Table.RowHeaderCell>{assignment.name}</Table.RowHeaderCell>
              <Table.Cell>{assignment.startDate}</Table.Cell>
              <Table.Cell>{assignment.dueDate}</Table.Cell>
              <Table.Cell
                className={`py-2 ${
                  assignment.status === "Completed"
                    ? "text-yellow-500"
                    : assignment.status === "Not Start"
                      ? "text-red-500"
                      : "text-green-500"
                }`}
              >
                {assignment.status}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default AssignmentsTable;
