import React, { useState, useEffect } from "react";
import { Card, Typography, Text } from "@radix-ui/themes";

import CreateAssessmentPopup from "./CreateAssignmentPopup";
import EditAssignmentPopup from "./EditAssignmentPopup";
import CreateExamPopup from "./CreateExamPopup";
import EditExamPopup from "./EditExamPopup";

export type Assessment = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: int;
  type: string;
  id: string;
  submissions: string;
};

export type Assignment = {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: int;
  id: string;
  submissions: string;
};

export type Exam = {};

export type ExamQuestion = {};

type AssessmentsProps = {
  assessmentList: Assessment[];
};

function filterAssessments(all) {
  let input = document.getElementById("assessmentSearch").value;
  return all.filter((ass) =>
    ass.name.toLowerCase().includes(input.toLowerCase()),
  );
}

const Assessments: React.FC<AssessmentsProps> = ({ assessmentList }) => {
  const HEADERS = [
    "Assessments",
    "Start Date",
    "End Date",
    "Completed",
    "Type",
    "Submissions",
    "Edit",
  ];

  const [subAssessmentsList, setSubAssessmentsList] = useState(assessmentList);

  const masterAssessmentsList = assessmentList;

  function SearchHandler() {
    let input = document.getElementById("assessmentSearch").value;
    let newSubAssessmentsList = [];
    if (input != "") {
      newSubAssessmentsList = filterAssessments(masterAssessmentsList);
    } else {
      newSubAssessmentsList = masterAssessmentsList;
    }
    setSubAssessmentsList(newSubAssessmentsList);
  }

  function ResetSearchHandler() {
    setSubAssessmentsList(masterAssessmentsList);
    document.getElementById("assessmentSearch").value = "";
  }

  function NewAssignmentHandler() {}

  function NewExamHandler() {}

  function EditHandler() {}

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
        <div className="flex p-3">
          {/*Search Box*/}
          <input
            id="assessmentSearch"
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
          <CreateAssessmentPopup />
          <CreateExamPopup />
        </div>

        <Card className="h-full w-full overflow-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead className="border border-blue-400 bg-blue-400">
              <tr>
                {HEADERS.map((head, index) => (
                  <th className="border p-3 text-center">
                    <Text as="span" className="text-m text-white">
                      {head}
                    </Text>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subAssessmentsList.map((ass, index) => (
                <tr>
                  <td className="border border-blue-400 text-center w-50%">
                    <Text as="span" className="text-sm text-black p-3">
                      {ass.name}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    <Text as="span" className="text-sm text-black p-3">
                      {ass.startDate}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    <Text as="span" className="text-sm text-black p-3">
                      {ass.endDate}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    <Text as="span" className="text-sm text-black p-3">
                      {ass.completed}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    <Text as="span" className="text-sm text-black p-3">
                      {ass.type}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    <Text as="span" className="text-sm text-black p-3">
                      {ass.submissions}
                    </Text>
                  </td>
                  <td className="border border-blue-400 text-center">
                    {/* change to a link - popup for grade adjustment
                    <a
                      onClick={() => console.log(ass)}
                      className="text-sm text-blue-800 hover:text-blue-400 p-3 hover:cursor-pointer"
                    >
                      Edit
                    </a>*/}
                    {ass.type == "assignment" ? (
                      <EditAssignmentPopup ass={ass} />
                    ) : (
                      <EditExamPopup ass={ass} />
                    )}
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

export default Assessments;
