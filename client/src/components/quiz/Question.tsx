import React from "react";

type QuestionProps = {
  title: string;
  type: string;
  options: string[];
  mark: number;
  onSelectAnswer: (selectedAnswer: string) => void;
};

const Question: React.FC<QuestionProps> = ({
  title,
  type,
  options,
  mark,
  onSelectAnswer,
}) => {
  return (
    <div className="flex flex-col p-4 border-2 border-blue-500 space-y-3 rounded-xl">
      <div className="text-md font-medium mb-2">{title}</div>

      {type === "SAQ" ? (
        <textarea
          className="p-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Your answer here"
          onChange={(e) => onSelectAnswer(e.target.value)}
          rows={3}
        />
      ) : (
        <div className="flex flex-col space-y-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-center space-x-3">
              <input
                type="radio"
                name="mcq"
                onChange={() => onSelectAnswer(option)}
                className="form-radio h-5 w-5"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
      <p className="text-md font-medium">{mark} Points</p>
    </div>
  );
};

export default Question;
