import React, { useState, useEffect } from "react";
import { Card, Typography, Text } from "@radix-ui/themes";
import { useBackend } from "@/hooks/useBackend";

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
};
