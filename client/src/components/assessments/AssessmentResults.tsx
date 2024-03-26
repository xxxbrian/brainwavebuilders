import React, { useState, useEffect } from "react";
import { Card, Typography, Text } from "@radix-ui/themes";

import EditGradePopup from "./EditGradePopup";
import EditFeedbackPopup from "./EditFeedbackPopup";
import FileCheck from "./FileCheck";

export type studentResults = {
  name: string;
  userName: string;
  status: string;
  grade: int;
  feedback: string;
  time: string;
  file: string;
};

type AssessmentResultsProps = {
  assessmentName: string;
  resultsList: StudentResults[];
};

function filterResults(allResults) {
  let input = document.getElementById("resultSearch").value;
  return allResults.filter((res) =>
    res.name.toLowerCase().includes(input.toLowerCase()),
  );
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  assessmentName,
  resultsList,
}) => {
  const RESULTS_HEAD = [
    "Name",
    "Username",
    "Status",
    "Grade",
    //"Edit",
    "Submitted Time",
    "Feedback",
    "Submission",
  ];

  const [subResultsList, setSubResultsList] = useState(resultsList);

  const masterResultsList = resultsList;

  function SearchHandler() {
    let input = document.getElementById("resultSearch").value;
    let newSubResultsList = [];
    if (input != "") {
      newSubResultsList = filterResults(masterResultsList);
    } else {
      newSubResultsList = masterResultsList;
    }
    setSubResultsList(newSubResultsList);
  }

  function ResetSearchHandler() {
    setSubResultsList(masterResultsList);
    document.getElementById("resultSearch").value = "";
  }

  function GradeEditHandler() {}

  function FeedbackHandler() {}

  function FileCheckHandler() {}

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
            id="resultSearch"
            placeholder="Search"
            className="border border-blue-400 rounded-lg p-1"
          />
          <button
            onClick={SearchHandler}
            className="border border-black bg-gray-100 rounded-full ml-5 px-3 hover:bg-gray-200 text-black"
          >
            Search
          </button>
          <button
            onClick={ResetSearchHandler}
            className="border border-black bg-gray-100 rounded-full ml-5 px-3 hover:bg-gray-200 text-black"
          >
            Reset
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
              {subResultsList.map((result, index) => (
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
                    <EditGradePopup res={result} />
                  </td>
                  <td className="border border-blue-400 text-center">
                    <Text as="span" className="text-sm text-black p-3">
                      {result.time}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    <EditFeedbackPopup
                      res={result}
                      assessmentName={assessmentName}
                    />
                  </td>
                  <td className="border border-blue-400 text-center">
                    {/* change to a link - link to file download
                    <a
                      onClick={FileCheckHandler}
                      className="text-sm text-blue-800 hover:text-blue-400 p-3 hover:cursor-pointer"
                    >
                      File
                    </a>*/}
                    <FileCheck res={result} assessmentName={assessmentName} />
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
