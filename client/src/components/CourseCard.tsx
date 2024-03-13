import React from "react";
import { Card, Text, Box } from "@radix-ui/themes";
import Image from "next/image";
import type { StaticImageData } from "next/image";

export type CourseCardProps = {
  headerImgSrc: StaticImageData;
  organizationLogoSrc: StaticImageData;
  organizationName: string;
  courseName: string;
  description: string;
  courseCode: string;
};

const CourseCard: React.FC<CourseCardProps> = ({
  headerImgSrc,
  organizationLogoSrc,
  organizationName,
  courseName,
  description,
  courseCode,
}) => {
  return (
    <Card
      className="
      rounded-3xl
      shadow-xl
      overflow-hidden
      max-w-sm border
      border-blue-400
      transition-transform
      duration-300
      ease-in-out
      transform
      hover:scale-105
      cursor-pointer
      w-[240px]
      h-[294px]"
    >
      {/* Content */}
      <Box className="p-3">
        {/* Header Image */}
        <Image
          src={headerImgSrc}
          alt="Course"
          className="rounded-t-lg object-cover"
          style={{
            width: "223px",
            height: "133px",
          }}
        />
        {/* Logo and Organization Name */}
        <div className="flex items-center space-x-3 mb-2">
          {/* Logo */}
          <Image
            src={organizationLogoSrc}
            alt="Organization name"
            width={32}
            height={32}
            className="rounded-t-lg object-cover"
          />
          {/* Organization Name */}
          <Text trim="both" className="text-lg font-medium text-gray-600">
            {organizationName}
          </Text>
        </div>
        {/* Course Name and Description */}
        <Box>
          {/* Course Name */}
          <div>
            <Text trim="both" className="text-based font-bold ">
              {courseName}
            </Text>
          </div>
          {/* Description */}
          <div>
            <Text trim="both" className="text-sm line-clamp-2 text-gray-600 ">
              {description}
            </Text>
          </div>
        </Box>
        {/* Course Code */}
        <Box className="flex flex-col">
          <Text trim="both" className="text-xl font-medium text-gray-600">
            {courseCode}
          </Text>
        </Box>
      </Box>
    </Card>
  );
};

export default CourseCard;
