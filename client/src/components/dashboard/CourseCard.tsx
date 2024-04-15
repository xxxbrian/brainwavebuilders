import React, { useCallback } from "react";
import { Card, Text, Box, Badge, Inset } from "@radix-ui/themes";
import { Course } from "@/backend";
import defaultCourseImg from "@/assets/UNSW.png";

export type CourseCardProps = {
  course: Course;
  onClick?: (course: Course) => void;
  role?: string;
};

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  role,
  onClick,
}) => {
  const { code, description, imageURL, name } = course;

  const onClickInner = useCallback(() => {
    onClick?.(course);
  }, [course, onClick]);

  return (
    <Box maxWidth="240px">
      <Card
        className="
    overflow-hidden
    max-w-sm
    transform
    cursor-pointer h-fit"
        onClick={onClickInner}
      >
        {/* Header Image */}
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={imageURL ?? defaultCourseImg.src}
            alt="Course"
            className="object-cover"
          />
        </Inset>

        {/* Content */}
        <div className="pb-2">
          {/* Course Name and Description */}
          <Box className="mt-3">
            {/* Course Name */}
            <div>
              <Text trim="both" className="text-based font-bold ">
                {name}
              </Text>
            </div>
            {/* Description */}
            <div className="mt-3">
              <Text trim="both" className="text-sm text-gray-600">
                {description}
              </Text>
            </div>
          </Box>
          {/* Course Code */}
          <Box className="mt-2">
            <Text trim="both" className="text-xl font-medium text-gray-600">
              {code}
            </Text>
          </Box>
          <Badge>{role}</Badge>
        </div>
      </Card>
    </Box>
  );
};
