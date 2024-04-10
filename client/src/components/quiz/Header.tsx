import { Flex } from "@radix-ui/themes";
import React, { useState, useEffect } from "react";

interface QuizInfoProps {
  title: string;
  description?: string;
  endDate: string;
}

const QuizHeader: React.FC<QuizInfoProps> = ({
  title,
  description,
  endDate,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endDate) - +new Date();
      let timeLeft = "";

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        timeLeft = `${hours}h ${minutes}m ${seconds}s`;
      } else {
        timeLeft = "Time's up!";
      }

      return timeLeft;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className="flex justify-between items-center p-4 bg-blue-100 rounded-2xl border-2 border-blue-500">
      <div className="space-y-2 max-w-[70%]">
        <h1 className="text-4xl font-bold text-[#004E89]">{title}</h1>
        <p>{description}</p>
      </div>
      <div className="space-y-2">
        <p className="font-semibold">Time Left: {timeLeft}</p>
        <Flex className="justify-end">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-opacity-90">
            End Quiz
          </button>
        </Flex>
      </div>
    </div>
  );
};

export default QuizHeader;
