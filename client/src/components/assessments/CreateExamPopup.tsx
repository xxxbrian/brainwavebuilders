import React, { useState } from "react";
import type { ChangeEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const CreateExamPopup: React.FC = () => {
  const [examName, setExamName] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examDue, setExamDue] = useState("");
  const [examDuration, setExamDuration] = useState(0);

  const handleExamNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExamName(e.target.value);
  };

  const handleExamDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExamDescription(e.target.value);
  };

  const handleExamDueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExamDue(e.target.value);
  };

  const handleExamDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setExamDuration(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send data to backend

    // Reset form fields after submission
    setExamName("");
    setExamDescription("");
    setExamDue("");
    setExamDuration(0);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="border border-black bg-orange-100 hover:text-white rounded-full hover:bg-orange-600 px-4 ml-5">
          New Exam
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 bg-white p-6 rounded-3xl shadow-lg"
          style={{
            width: "90%",
            height: "90%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Dialog.Title className="flex justify-between items-start font-sans">
            <span className="font-bold text-[40px] leading-[48px] tracking-normal text-blue-500">
              Create Exam
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
            <div className="flex flex-col border border-blue-800 rounded-xl bg-blue-200 mt-2 pl-3 w-full">
              <div className="flex m-2 w-full pt-2">
                <label
                  htmlFor="examName"
                  className="block text-lg font-medium mt-2 w-1/6"
                >
                  Exam Title
                </label>
                <input
                  type="text"
                  name="examName"
                  id="examName"
                  value={examName}
                  onChange={handleExamNameChange}
                  className="block rounded-md border border-blue-800 p-2 text-md bg-white w-4/5"
                  placeholder="Enter exam name"
                  required
                />
              </div>
              <div className="flex m-2 w-full">
                <label
                  htmlFor="examDescription"
                  className="block text-lg font-medium mt-2 w-1/6"
                >
                  Exam Description
                </label>
                <textarea
                  name="examDescription"
                  id="examDescription"
                  value={examDescription}
                  onChange={handleExamDescriptionChange}
                  rows={2}
                  className=" block rounded-md border-blue-800 border p-2 text-md bg-white w-4/5"
                  placeholder="Enter exam description"
                  required
                ></textarea>
              </div>
              <div className="flex">
                <div className="flex m-2 w-1/2">
                  <label
                    htmlFor="examDuration"
                    className="block text-lg font-medium mt-2 w-1/3"
                  >
                    Exam Duration
                  </label>
                  <input
                    type="number"
                    name="examDuration"
                    id="examDuration"
                    value={examDuration}
                    onChange={handleExamDurationChange}
                    className="block rounded-md border border-blue-800 p-2 text-md bg-white w-2/3"
                    placeholder="Enter exam duration"
                    required
                  />
                </div>
                <div className="flex m-2 w-1/2">
                  <label
                    htmlFor="examDuration"
                    className="block text-lg font-medium mt-2 w-1/3"
                  >
                    Exam Duration
                  </label>
                  <input
                    type="number"
                    name="examDuration"
                    id="examDuration"
                    value={examDuration}
                    onChange={handleExamDurationChange}
                    className="block rounded-md border border-blue-800 p-2 text-md bg-white w-2/3"
                    placeholder="Enter exam duration"
                    required
                  />
                </div>
              </div>
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

export default CreateExamPopup;
