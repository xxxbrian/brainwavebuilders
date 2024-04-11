import React, { useState, useEffect } from "react";

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
  onClickAddButton: () => void;
}

// Component to display a table of assignments
const AssignmentsTable: React.FC<AssignmentsTableProps> = ({
  assignments,
  type,
  onClickAddButton,
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
    <div className="shadow-lg">
      <div className="flex justify-between text-3xl font-bold bg-blue-100 text-[#004E89] px-3 py-2">
        <h1>{type}</h1>
        <button onClick={onClickAddButton}>+</button>
      </div>
      <table className="w-full rouned-b-xl">
        <thead className="bg-gray-50 text-[#004E89]">
          <tr>
            <td className="py-2 font-bold text-lg pl-2">Title</td>
            <td className="py-2 font-bold text-lg">Start Date</td>
            <td className="py-2 font-bold text-lg">Due Date</td>
            <td className="py-2 font-bold text-lg">Status</td>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedAssignments.map((assignment) => (
            <tr key={assignment.id} className="text-md">
              <td className="py-2 pl-2">{assignment.name}</td>
              <td className="py-2">{assignment.startDate}</td>
              <td className="py-2">{assignment.dueDate}</td>
              <td
                className={`py-2 ${
                  assignment.status === "Completed"
                    ? "text-yellow-500"
                    : assignment.status === "Not Start"
                      ? "text-red-500"
                      : "text-green-500"
                }`}
              >
                {assignment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentsTable;
