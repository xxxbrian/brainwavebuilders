import React, { useState } from "react";
import type { ChangeEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { Assessment } from "./Assessments";

const EditAssignmentPopup: React.FC<Assessment> = ({ ass }) => {
  const [assessmentName, setAssessmentName] = useState(ass.name);
  const [assessmentDescription, setAssessmentDescription] = useState(
    ass.description,
  );
  const [assessmentDue, setAssessmentDue] = useState(ass.endDate);

  const handleAssessmentNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssessmentName(e.target.value);
  };

  const handleAssessmentDescriptionChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setAssessmentDescription(e.target.value);
  };

  const handleAssessmentDueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAssessmentDue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send data to backend
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <a className="text-blue-400 hover:text-blue-100 text-sm hover:cursor-pointer">
          Edit
        </a>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 bg-white p-6 rounded-3xl shadow-lg"
          style={{
            width: "700px",
            height: "424px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Dialog.Title className="flex justify-between items-start font-sans">
            <span className="font-bold text-[40px] leading-[48px] tracking-normal text-blue-500">
              Edit Assignment
            </span>
            {/* Close Button */}
            <Dialog.Close asChild>
              <button
                className="text-orange-500 hover:text-orange-600 transform hover:scale-110 text-2xl"
                style={{ transition: "transform 0.2s" }}
              >
                ×
              </button>
            </Dialog.Close>
          </Dialog.Title>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex font-sans">
              <div className="flex flex-col m-2 w-1/2">
                <label
                  htmlFor="assessmentName"
                  className="block text-lg font-medium mt-2"
                >
                  Assessment Name
                </label>
                <input
                  type="text"
                  name="assessmentName"
                  id="assessmentName"
                  value={assessmentName}
                  onChange={handleAssessmentNameChange}
                  className="mt-1 block rounded-md border-gray-400 border-2 p-2 text-md"
                  placeholder="Enter assessment name"
                  required
                />
              </div>
              <div className="flex flex-col m-2 w-1/2">
                <label
                  htmlFor="assessmentDue"
                  className="block text-lg font-medium mt-2"
                >
                  Assessment Due Date
                </label>
                <input
                  type="date"
                  name="assessmentDue"
                  id="assessmentDue"
                  value={assessmentDue}
                  onChange={handleAssessmentDueChange}
                  className="mt-1 block rounded-md border-gray-400 border-2 p-2 text-md"
                  placeholder="Select due date"
                  required
                />
              </div>
            </div>
            <div className="m-2 mb-4 font-sans">
              <label
                htmlFor="assessmentDescription"
                className="block text-lg font-medium mt-2"
              >
                Assessment Description
              </label>
              <textarea
                name="assessmentDescription"
                id="assessmentDescription"
                value={assessmentDescription}
                onChange={handleAssessmentDescriptionChange}
                rows={4}
                className="mt-1 block rounded-md border-gray-400 border-2 p-2 text-md w-full"
                placeholder="Enter assessment description"
                required
              ></textarea>
            </div>
            <div className="flex justify-end mt-4 font-sans">
              <button
                type="submit"
                className="items-center justify-center rounded-md bg-[#004E89] text-lg font-bold text-white hover:bg-opacity-90 mr-6 mt-2"
                style={{ width: "156px", height: "44px" }}
              >
                Confirm Changes
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditAssignmentPopup;
