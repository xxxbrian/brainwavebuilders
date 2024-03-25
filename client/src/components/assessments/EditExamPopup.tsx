import React, { useState } from "react";
import type { ChangeEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const EditExamPopup: React.FC = () => {
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examDue, setExamDue] = useState("");

  const handleExamNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExamName(e.target.value);
  };

  const handleExamDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExamDescription(e.target.value);
  };

  const handleExamDueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExamDue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send data to backend

    // Reset form fields after submission
    setExamName("");
    setExamDescription("");
    setExamDue("");
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
              Create Assignment
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
                  htmlFor="examName"
                  className="block text-lg font-medium mt-2"
                >
                  Assessment Name
                </label>
                <input
                  type="text"
                  name="examName"
                  id="examName"
                  value={examName}
                  onChange={handleExamNameChange}
                  className="mt-1 block rounded-md border-gray-400 border-2 p-2 text-md"
                  placeholder="Enter exam name"
                  required
                />
              </div>
              <div className="flex flex-col m-2 w-1/2">
                <label
                  htmlFor="examDue"
                  className="block text-lg font-medium mt-2"
                >
                  Assessment Due Date
                </label>
                <input
                  type="date"
                  name="examDue"
                  id="examDue"
                  value={examDue}
                  onChange={handleExamDueChange}
                  className="mt-1 block rounded-md border-gray-400 border-2 p-2 text-md"
                  placeholder="Select due date"
                  required
                />
              </div>
            </div>
            <div className="m-2 mb-4 font-sans">
              <label
                htmlFor="examDescription"
                className="block text-lg font-medium mt-2"
              >
                Assessment Description
              </label>
              <textarea
                name="examDescription"
                id="examDescription"
                value={examDescription}
                onChange={handleExamDescriptionChange}
                rows={4}
                className="mt-1 block rounded-md border-gray-400 border-2 p-2 text-md w-full"
                placeholder="Enter exam description"
                required
              ></textarea>
            </div>
            <div className="flex justify-end mt-4 font-sans">
              <button
                type="submit"
                className="items-center justify-center rounded-md bg-[#004E89] text-lg font-bold text-white hover:bg-opacity-90 mr-6 mt-2"
                style={{ width: "156px", height: "44px" }}
              >
                Create Assignment
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditExamPopup;
