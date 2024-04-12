import {
  Assessment as AssessmentDB,
  Submission as SubmissionDB,
  Question as QuestionDB,
} from "@prisma/client";
import {
  Assessment as AssessmentAPI,
  Submission as SubmissionAPI,
  Question as QuestionAPI,
  NewQuestion as NewQuestionAPI,
} from "@/apis";
import { AssessmentDetails } from "@/data/assessment";

// Adjust the formatAssessment function to check for the presence of questions and submissions
// questions can be empty for Assignment
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
      ? assessment.questions.map((question) => {
          return {
            id: question.id,
            assessmentId: question.assessmentID,
            title: question.title,
            type: question.type,
            options: question.options,
            points: question.points,
          };
        })
      : [];

  return { ...formatAssessment(assessment), questions };
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
    assessmentId: question.assessmentID,
    title: question.title,
    type: question.type,
    options: question.options,
    answer: question.answer ?? undefined,
    points: question.points,
  };
};
