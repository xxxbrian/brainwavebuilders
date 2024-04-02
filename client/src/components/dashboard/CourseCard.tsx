import React from "react";
import { Card, Text, Box } from "@radix-ui/themes";
import Image from "next/image";
import { Course } from "@/backend";

export type CourseCardProps = {
  course: Course;
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { code, description, imageURL, name } = course;

  return (
    <Card
      className="
      rounded-3xl
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
    >
      {/* Content */}
      <Box className="p-3">
        {/* Header Image */}
        <img
          src={imageURL}
          alt="Course"
          className="rounded-t-lg object-cover"
          style={{
            width: "223px",
            height: "133px",
          }}
        />
        {/* Course Name and Description */}
        <Box>
          {/* Course Name */}
          <div>
            <Text trim="both" className="text-based font-bold ">
              {name}
            </Text>
          </div>
          {/* Description */}
          <div className="mt-3">
            <Text
              trim="both"
              className="text-sm line-clamp-2 text-gray-600"
              style={{ lineHeight: "1" }}
            >
              {description}
            </Text>
          </div>
        </Box>
        {/* Course Code */}
        <Box className="mt-3">
          <Text trim="both" className="text-xl font-medium text-gray-600">
            {code}
          </Text>
        </Box>
      </Box>
    </Card>
  );
};

export default CourseCard;
