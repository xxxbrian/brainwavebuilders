import React from "react";

interface AssessmentHeaderProps {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  title,
  description,
  startDate,
  endDate,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}-${hours}:${minutes}`;
  };

  return (
    <div className="p-4 rounded-2xl border-2 border-blue-500">
      <div className="mb-4">
        <span className="text-md font-bold block mb-2">Title</span>
        <div className="px-3 py-2 ">{title}</div>
      </div>
      <div className="mb-4">
        <span className="text-md font-bold block mb-2">Description</span>
        <div className="px-3 py-2 ">{description}</div>
      </div>
      <div className="flex justify-between">
        <div className="w-2/5">
          <span className="text-md font-bold block mb-2">Start Date</span>
          <div className="px-3 py-2 ">{formatDate(startDate)}</div>
        </div>
        <div className="w-2/5">
          <span className="text-md font-bold block mb-2">End Date</span>
          <div className="px-3 py-2 ">{formatDate(endDate)}</div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentHeader;
