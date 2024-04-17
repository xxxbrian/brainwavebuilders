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
      setIsLoading(true);
      e.preventDefault();

      const { course } = await backend.createCourse({
        name: courseName,
        description: courseDescription,
      });

      router.push(`/course/${course.id}`);
    },
    [backend, courseDescription, courseName, router],
  );

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="solid" size={"3"}>
          Create Course
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="bg-white rounded-3xl shadow-lg">
        <Dialog.Title>Create Course</Dialog.Title>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="courseName" className="block text-md font-medium">
              Course Name
            </label>
            <TextField.Root
              value={courseName}
              onChange={handleCourseNameChange}
              placeholder="Enter course name"
              required
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="courseDescription"
              className="block text-md font-medium"
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
            <Button
              variant="solid"
              type="submit"
              size={"3"}
              disabled={isLoading}
            >
              Create Course
            </Button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
