import React, { useState } from "react";
import type { ChangeEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { studentResults } from "./AssessmentResults";

const EditFeedbackPopup: React.FC<studentResults> = ({
  res,
  assessmentName,
}) => {
  const [feedback, setFeedback] = useState(res.feedback);

  const handleFeedbackChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send data to backend
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <a className="text-blue-400 hover:text-blue-100 text-sm hover:cursor-pointer">
          Feedback
        </a>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 bg-white p-6 rounded-3xl shadow-lg"
          style={{
            width: "700px",
            height: "600px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Dialog.Title className="flex justify-between items-start font-sans">
            <span className="font-bold text-[40px] leading-[48px] tracking-normal text-blue-500 ml-2">
              {"Feedback for: " + res.name}
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
            <div className="m-2 mb-4 font-sans">
              <label
                htmlFor="assessmentDescription"
                className="block text-lg font-medium mt-2"
              >
                {assessmentName}
              </label>
              <textarea
                name="feedback"
                id="feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                rows={16}
                className="mt-1 block rounded-md border-gray-400 border-2 p-2 text-md w-full resize-none"
                placeholder="Enter feedback"
                required
              ></textarea>
            </div>
            <div className="flex justify-end mt-4 font-sans">
              <button
                type="submit"
                className="items-center justify-center rounded-md bg-[#004E89] text-lg font-bold text-white hover:bg-opacity-90 mr-6 mt-2"
                style={{ width: "156px", height: "44px" }}
              >
                Confirm
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditFeedbackPopup;
