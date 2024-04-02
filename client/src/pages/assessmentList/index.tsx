import React, { useState, useEffect } from "react";
import { Card, Typography, Text } from "@radix-ui/themes";
import TopNav, { type TopNavProps } from "../../components/dashboard/TopNav";
import SideNav from "../../components/dashboard/SideNav";

import CreateAssessmentPopup from "../../components/assessment/CreateAssignmentPopup";
import EditAssignmentPopup from "../../components/assessment/EditAssignmentPopup";
import CreateExamPopup from "../../components/assessment/CreateExamPopup";
import EditExamPopup from "../../components/assessment/EditExamPopup";

import Assessment from "../../components/assessment/Assessments";

const ass1: Assessment = {
  name: "string",
  description: "testingtesintesnignsine",
  startDate: "2024-03-25",
  endDate: "2024-04-05",
  completed: "No",
  type: "assignment",
  id: "test_ass",
  submissions: "91/100",
};

const assessmentList: Assessment[] = [
  ass1,
  ass1,
  ass1,
  ass1,
  ass1,
  ass1,
  ass1,
  ass1,
  ass1,
  ass1,
  ass1,
  ass1,
  ass1,
];

function filterAssessments(all) {
  let input = document.getElementById("assessmentSearch").value;
  return all.filter((ass) =>
    ass.name.toLowerCase().includes(input.toLowerCase()),
  );
}

export const AssessmentList: React.FC = () => {
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
            m-auto
            mt-10"
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

            <div className="h-[350px] w-full overflow-y-scroll m-3">
              <table className="w-full min-w-max table-auto text-left h-full">
                <thead className="border border-blue-400 bg-blue-400 sticky top-0">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssessmentList;
