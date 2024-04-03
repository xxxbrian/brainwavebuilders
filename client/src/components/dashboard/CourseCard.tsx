import React, { useCallback } from "react";
import { Card, Text, Box, Badge } from "@radix-ui/themes";
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
    <Card
      className="
      overflow-hidden
      max-w-sm
      shadow-md
      transition-transform
      ease-in-out
      transform
      cursor-pointer
      bg-gray-300
      w-[240px]
      h-[294px]"
      onClick={onClickInner}
    >
      {/* Content */}
      <Box className="p-2">
        <Badge>{role}</Badge>
        {/* Header Image */}
        <img
          src={imageURL ?? defaultCourseImg.src}
          alt="Course"
          className="rounded-lg object-cover"
          style={{
            width: "223px",
            height: "133px",
          }}
        />
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
            <Text trim="both" className="text-sm line-clamp-2 text-gray-600">
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
      </Box>
    </Card>
  );
};
