import React, { useState, useEffect } from "react";
import { Card, Typography, Text } from "@radix-ui/themes";

export type studentResults = {
  name: string;
  userName: string;
  status: string;
  grade: int;
  time: string;
  file: string;
};

type AssessmentResultsProps = {
  assessmentName: string;
  resultsList: StudentResults[];
};

function SearchHandler() {}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  assessmentName,
  resultsList,
}) => {
  const RESULTS_HEAD = [
    "Name",
    "Username",
    "Status",
    "Grade",
    "Edit",
    "Submitted Time",
    "Feedback",
    "Submission",
  ];

  return (
    <>
      <div
        className="
        container
        px-6
        border-2
        border-blue-200
        rounded-2xl
        max-w-[1098px]
        min-w-[600px]
        h-fit"
      >
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <Text as="span" className="text-xl text-blue-800 ml-2 p-3">
              {"Grades: " + assessmentName}
            </Text>
          </div>
        </div>

        <div className="flex p-3">
          {/*Search Box*/}
          <input
            name="resultSearch"
            placeholder="Search"
            className="border border-blue-400 rounded-lg"
          />
          <button
            onClick={SearchHandler}
            className="border border-black bg-gray-100 rounded-full ml-5 px-3 hover:bg-gray-200 text-black"
          >
            Search
          </button>
        </div>

        <Card className="h-full w-full overflow-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="border border-blue-400 bg-blue-400">
              <tr>
                {RESULTS_HEAD.map((head, index) => (
                  <th className="border p-3 text-center">
                    <Text as="span" className="text-m text-white">
                      {head}
                    </Text>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {resultsList.map((result, index) => (
                <tr>
                  <td className="border border-blue-400 text-center">
                    <Text as="span" className="text-sm text-black p-3">
                      {result.name}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    <Text as="span" className="text-sm text-black p-3">
                      {result.userName}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    <Text as="span" className="text-sm text-black p-3">
                      {result.status}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    {/* change to a link - popup for grade adjustment*/}
                    <Text as="span" className="text-sm text-black p-3">
                      {result.grade + "%"}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    {/* change to a link - popup for submission editing (do we need this?)*/}
                    <Text as="span" className="text-sm text-black p-3">
                      {"Edit"}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    <Text as="span" className="text-sm text-black p-3">
                      {result.time}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    {/* change to a link - link to feedback popup*/}
                    <Text as="span" className="text-sm text-black p-3">
                      {"Feedback"}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    {/* change to a link - link to file download*/}
                    <Text as="span" className="text-sm text-black p-3">
                      {result.file}
                    </Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  );
};

export default AssessmentResults;
