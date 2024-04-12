import React from "react";
import { FaRegPenToSquare } from "react-icons/fa6";

interface Submission {
  id: string;
  studentName: string;
  submittedAt: string;
  grade?: number;
}

interface SubmissionsTableProps {
  submissions: Submission[];
  onClickMark: (submissionId: string) => void;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  submissions,
  onClickMark,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="shadow-lg">
      <table className="w-full rounded-b-xl">
        <thead className="bg-gray-50 text-[#004E89]">
          <tr>
            <td className="py-2 font-bold text-lg pl-2">Student Name</td>
            <td className="py-2 font-bold text-lg">Submitted Time</td>
            <td className="py-2 font-bold text-lg">Grade</td>
            <td></td>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {submissions.map((submission) => (
            <tr key={submission.id}>
              <td className="py-2 pl-2">{submission.studentName}</td>
              <td className="py-2">{formatDate(submission.submittedAt)}</td>
              <td className="py-2">
                {submission.grade !== undefined ? (
                  `${submission.grade}/100`
                ) : (
                  <span className="text-red-500">Not marked yet</span>
                )}
              </td>
              <td
                className="cursor-pointer"
                onClick={() => onClickMark(submission.id)}
              >
                <FaRegPenToSquare />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionsTable;
