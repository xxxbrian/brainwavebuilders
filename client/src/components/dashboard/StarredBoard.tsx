import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import type { CourseCardProps } from "./CourseCard";
import { Text } from "@radix-ui/themes";
import { FaStar } from "react-icons/fa6";

type CourseContainerProps = {
  courses: CourseCardProps[];
};

const CourseContainer: React.FC<CourseContainerProps> = ({ courses }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [coursesPerPage, setCoursesPerPage] = useState(4);

  // Listen to screen width changes and adjust courses per page accordingly
  useEffect(() => {
    const updateCoursesPerPage = () => {
      setCoursesPerPage(
        window.innerWidth < 600
          ? 1
          : window.innerWidth < 1125
            ? 2
            : window.innerWidth < 1375
              ? 3
              : 4,
      );
    };

    window.addEventListener("resize", updateCoursesPerPage);
    updateCoursesPerPage(); // Call on initial render as well

    return () => window.removeEventListener("resize", updateCoursesPerPage);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  // Handlers for next and previous buttons
  const goToNextPage = () =>
    setCurrentPage((page) => Math.min(page + 1, totalPages - 1));
  const goToPrevPage = () => setCurrentPage((page) => Math.max(page - 1, 0));

  // Calculate the slice of courses to show based on the current page
  const startIndex = currentPage * coursesPerPage;
  const displayedCourses = courses.slice(
    startIndex,
    startIndex + coursesPerPage,
  );

  return (
    <div
      className="
      container
      px-6
      border-2
      border-blue-200
      rounded-2xl
      max-w-[1098px]"
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <FaStar className="text-2xl text-blue-800 mr-3" />
          <Text as="span" className="text-3xl text-blue-800 ml-2">
            Starred Board
          </Text>
        </div>
        <div>
          <button
            onClick={goToPrevPage}
            className={`w-20 h-8 bg-[#004E89] text-white font-bold text-align-center rounded-lg ${
              currentPage === 0
                ? "disabled:bg-[#5089B4]"
                : "hover:bg-opacity-90"
            }`}
            disabled={currentPage === 0}
          >
            Prev
          </button>
          <button
            onClick={goToNextPage}
            className={`w-20 h-8 bg-[#004E89] text-white font-bold text-align-center rounded-lg ml-4 ${
              currentPage === totalPages - 1
                ? "disabled:bg-[#5089B4]"
                : "hover:bg-opacity-90"
            }`}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>

      <div className="flex p-3">
        {displayedCourses.map((course, index) => (
          <div
            key={index}
            className="px-4 mb-6 flex-none"
            style={{
              width: `${100 / coursesPerPage}%`,
            }}
          >
            <CourseCard {...course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseContainer;
