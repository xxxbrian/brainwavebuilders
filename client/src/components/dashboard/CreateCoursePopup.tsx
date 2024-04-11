import { useBackend } from "@/hooks/useBackend";
import { Button, Dialog, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import type { ChangeEvent } from "react";

export const CreateCourseButton: React.FC = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  const handleCourseNameChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCourseName(e.target.value);
    },
    [],
  );

  const handleCourseDescriptionChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setCourseDescription(e.target.value);
    },
    [],
  );

  const backend = useBackend();

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const { course } = await backend.createCourse({
        name: courseName,
        description: courseDescription,
      });

      router.push(`/course/${course.id}`);
    },
    [backend, courseDescription, courseName, router],
  );

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button className="bg-gray-300 hover:text-white rounded-xl hover:bg-gray-400 px-4 py-2 flex-shrink-0">
          Create Course
        </button>
      </Dialog.Trigger>
      <Dialog.Content className="bg-white px-10 py-6 rounded-3xl shadow-lg">
        <Dialog.Title className="flex justify-between items-start">
          Create Course
          {/* Close Button */}
          <Dialog.Close>
            <button>×</button>
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
            <TextField.Root
              value={courseName}
              onChange={handleCourseNameChange}
              placeholder="Enter course name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="courseDescription"
              className="block text-lg font-medium mt-2"
            >
              Course Description
            </label>
            <TextArea
              value={courseDescription}
              onChange={handleCourseDescriptionChange}
              placeholder="Enter course description"
              required
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="solid" type="submit" size={"3"}>
              Create Course
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
