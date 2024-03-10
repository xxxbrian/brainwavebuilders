import React from "react";
import CourseCard from "./CourseCard";
import type { CourseCardProps } from "./CourseCard";
import { Text } from "@radix-ui/themes";

type CourseContainerProps = {
  courses: CourseCardProps[];
};

const CourseContainer: React.FC<CourseContainerProps> = ({ courses }) => {
  return (
    <div className="container mx-auto px-6 border-2 border-blue-200 rounded-xl max-w-[1098px] ">
      <div className="px-4 py-2">
        {/* TODO Add star image here */}
        <Text className="text-3xl text-blue-700">Starred Board</Text>
      </div>
      <div className="flex flex-wrap -mx-4">
        {courses.map((course, index) => (
          <div
            key={index}
            className="
                  px-4
                  mb-6
                  w-full
                  sm:w-1/2
                  md:w-1/2
                  lg:w-1/4"
          >
            <CourseCard {...course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContainer;
