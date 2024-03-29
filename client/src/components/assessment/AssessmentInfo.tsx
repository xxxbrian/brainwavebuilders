import React, { useCallback, useMemo } from "react";

interface AssessmentInfoProps {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  duration: number;
  setDuration: (value: number) => void;
  startDate: string;
  setStartDate: (value: string) => void;
}

const AssessmentInfo: React.FC<AssessmentInfoProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  duration,
  setDuration,
  startDate,
  setStartDate,
}) => {
  const minStartDate = useMemo(() => {
    const now = new Date();
    return now.toISOString().slice(0, 16);
  }, []);

  const handleTitleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(event.target.value);
    },
    [setTitle],
  );

  const handleDescriptionChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setDescription(event.target.value);
    },
    [setDescription],
  );

  const handleDurationChange = useCallback(
    (newDuration: number) => {
      if (newDuration >= 0) {
        setDuration(newDuration);
      }
    },
    [setDuration],
  );

  const handleStartDateChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setStartDate(event.target.value);
    },
    [setStartDate],
  );

  return (
    <div className="p-4 bg-blue-100 rounded-2xl border-2 border-blue-500">
      <div className="mb-4">
        <label htmlFor="title" className="text-md font-medium block mb-2">
          Assessment Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Assessment Title"
          value={title}
          onChange={handleTitleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:border-2"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="text-md font-medium block mb-2">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:border-2"
          rows={4}
        />
      </div>
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label htmlFor="duration" className="text-md font-medium block mb-2">
            Duration
          </label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => handleDurationChange(Number(e.target.value))}
            className="px-3 py-2 border w-20 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
          />
          <span className="ml-2 text-xl">minutes</span>
        </div>
        {/* Start Date Input */}
        <div className="w-1/2">
          <label htmlFor="startDate" className="text-md font-medium block mb-2">
            Start Date
          </label>
          <input
            id="startDate"
            type="datetime-local"
            value={startDate}
            onChange={handleStartDateChange}
            min={minStartDate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:border-2"
          />
        </div>
      </div>
    </div>
  );
};

export default AssessmentInfo;
