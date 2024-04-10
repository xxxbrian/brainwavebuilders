import {
  Assessment as AssessmentDB,
  Submission as SubmissionDB,
  Question as QuestionDB,
} from "@prisma/client";
import {
  Assessment as AssessmentAPI,
  Submission as SubmissionAPI,
  Question as QuestionAPI,
} from "@/apis";

import { AssessmentDetails } from "@/data/assessment";

// Adjust the formatAssessment function to check for the presence of questions and submissions
export const formatAssessment = (
  assessment: AssessmentDB | AssessmentDetails,
): AssessmentAPI => {
  const questions =
    "questions" in assessment ? assessment.questions.map(formatQuestion) : [];
  const submissions =
    "submissions" in assessment
      ? assessment.submissions.map(formatSubmission)
      : [];

  return {
    id: assessment.id,
    title: assessment.title,
    description: assessment.description ?? undefined,
    courseId: assessment.courseID,
    startDate: assessment.startDate
      ? assessment.startDate.toISOString()
      : undefined,
    dueDate: assessment.dueDate ? assessment.dueDate.toISOString() : undefined,
    type: assessment.type,
    questions,
    submissions,
  };
};

export const formatAssessmentForStudent = (
  assessment: AssessmentDB | AssessmentDetails,
): AssessmentAPI => {
  const questions =
    "questions" in assessment
      ? assessment.questions.map((question: QuestionDB) => {
          let parsedOptions = question.options
            ? JSON.parse(question.options)
            : null;
          if (parsedOptions && "correct" in parsedOptions) {
            delete parsedOptions.correct;
          }

          const optionsWithoutCorrect = parsedOptions
            ? JSON.stringify(parsedOptions)
            : null;

          return {
            ...question,
            options: optionsWithoutCorrect, // Using modified or original options string
          };
        })
      : [];

  return {
    ...formatAssessment(assessment), // Assuming formatAssessment is compatible or needs minor adjustments
    questions,
  };
};

export const formatSubmission = (submission: SubmissionDB): SubmissionAPI => {
  return {
    id: submission.id,
    assessmentId: submission.assessmentId,
    studentId: submission.studentId,
    submittedAt: submission.submittedAt
      ? submission.submittedAt.toISOString()
      : undefined,
    fileUrl: submission.fileUrl ?? undefined,
    answers: submission.answers,
    grade: submission.grade ?? undefined,
  };
};

export const formatQuestion = (question: QuestionDB): QuestionAPI => {
  return {
    id: question.id,
    assessmentId: question.assessmentId,
    title: question.title,
    type: question.type,
    options: question.options,
    points: question.points,
  };
};
