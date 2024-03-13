import React, { useState } from "react";
import type { ChangeEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const CreateClassPopup: React.FC = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const handleCourseNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseName(e.target.value);
  };

  const handleCourseDescriptionChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCourseDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send data to backend

    // Reset form fields after submission
    setCourseName("");
    setCourseDescription("");
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-gray-300 hover:text-white rounded-xl hover:bg-gray-400 px-4 py-2 mr-3">
          Create Class
        </button>
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
          <Dialog.Title className="flex justify-between items-start">
            <span className="font-bold text-[40px] leading-[48px] tracking-normal text-blue-500">
              Create Class
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
            <div className="mb-4">
              <label
                htmlFor="courseName"
                className="block text-lg font-medium mt-2"
              >
                Course Name
              </label>
              <input
                type="text"
                name="courseName"
                id="courseName"
                value={courseName}
                onChange={handleCourseNameChange}
                className="mt-1 block rounded-md border-gray-400 border-2 p-2 text-md"
                placeholder="Enter course name"
                required
                style={{ width: "626px", height: "44px" }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="courseDescription"
                className="block text-lg font-medium mt-2"
              >
                Course Description
              </label>
              <textarea
                name="courseDescription"
                id="courseDescription"
                value={courseDescription}
                onChange={handleCourseDescriptionChange}
                rows={4}
                className="mt-1 block rounded-md border-gray-400 border-2 p-2 text-md"
                placeholder="Enter course description"
                required
                style={{ width: "626px", height: "121px" }}
              ></textarea>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="items-center justify-center rounded-md bg-[#004E89] text-lg font-bold text-white hover:bg-opacity-90 mr-6 mt-2"
                style={{ width: "156px", height: "44px" }}
              >
                Create Class
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateClassPopup;
