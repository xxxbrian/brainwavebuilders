import React, { useState, useEffect } from "react";
import { Card, Typography, Text } from "@radix-ui/themes";
import { useBackend } from "@/hooks/useBackend";

import EditGradePopup from "../../components/assessment/EditGradePopup";
import EditFeedbackPopup from "../../components/assessment/EditFeedbackPopup";
import FileCheck from "../../components/assessment/FileCheck";

import TopNav, { type TopNavProps } from "../../components/dashboard/TopNav";
import SideNav from "../../components/dashboard/SideNav";

import {
  studentResults,
  AssessmentResultsProps,
} from "../../components/assessment/AssessmentResults";

const result1: studentResults = {
  name: "Ethan Reinhard",
  userName: "z5308765@ad.unsw.edu.au",
  status: "Submitted On Time",
  grade: 10,
  feedback: "testestestset",
  time: "10/10/23 10am",
  file: "test",
};

const resultsList = [
  result1,
  result1,
  result1,
  result1,
  result1,
  result1,
  result1,
  result1,
  result1,
  result1,
  result1,
];

function filterResults(allResults) {
  let input = document.getElementById("resultSearch").value;
  if (isNaN(input.charAt(0))) {
    return allResults.filter((res) =>
      res.name.toLowerCase().includes(input.toLowerCase()),
    );
  } else {
    return allResults.filter((res) =>
      res.time.toLowerCase().includes(input.toLowerCase()),
    );
  }
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  assessmentName,
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

  const backend = useBackend();
  useEffect(() => {}, [backend]);

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

  const topNavProps: TopNavProps = {
    displayType: "course",
    courseCode: "COMP3900",
    courseName: "Computer Science Project",
    userName: "Steve",
  };

  return (
    <>
      <div className="flex">
        <div className="lg:block">
          <SideNav displayType={topNavProps.displayType} />
        </div>
        <div className="flex-grow">
          <TopNav {...topNavProps} />
          <div
            className="
            container
            px-6
            border-2
            border-blue-200
            rounded-2xl
            max-w-[1098px]
            min-w-[600px]
            h-fit
            max-h-[600px]
            m-auto
            mt-10"
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

            <div className="h-[350px] w-full overflow-y-scroll m-3">
              <table className="w-full min-w-max table-auto text-left h-full">
                <thead className="border border-blue-400 bg-blue-400 sticky top-0">
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
                        <FileCheck
                          res={result}
                          assessmentName={assessmentName}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssessmentResults;
