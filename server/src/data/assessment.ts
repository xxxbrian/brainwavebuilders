import { db } from "@/globals";
import { Assessment, Submission, Question } from "@prisma/client";
import { APIError } from "@/apis";
import {
  CreateAssessmentRequest,
  SubmitAnswersRequest,
  SubmitAssignmentRequest,
  FetchAssessmentDetailsTeacherRequest as fetchAssessmentDetailsRequest,
  ManualGradeSubmissionRequest,
  AssignmentGradeSubmissionRequest,
} from "@/apis";
import { hasCourse } from "./course";

export const createAssessment = async (
  data: CreateAssessmentRequest,
): Promise<Assessment> => {
  try {
    const courseExists = await hasCourse(data.courseId);

    if (!courseExists) {
      throw new APIError("Course not found", "COURSE_NOT_FOUND");
    }

    const assessment = await db.$transaction(async (transactionalDb) => {
      const createdAssessment = await transactionalDb.assessment.create({
        data: {
          title: data.title,
          description: data.description,
          courseID: data.courseId,
          startDate: data.startDate ? new Date(data.startDate) : null,
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
          type: data.type,
        },
      });

      // Create questions if they are included in the request
      if (data.questions && data.questions.length > 0) {
        await Promise.all(
          data.questions.map((question) =>
            transactionalDb.question.create({
              data: {
                assessmentID: createdAssessment.id,
                title: question.title,
                type: question.type,
                options: JSON.stringify(question.options),
                answer: question.answer,
                points: question.points,
              },
            }),
          ),
        );
      }

      return createdAssessment;
    });

    return assessment;
  } catch (error) {
    console.error("Failed to create an assessment:", error);
    throw new APIError("Failed to create an assessment", "CREATION_FAILED");
  }
};

export const submitAnswers = async (
  data: SubmitAnswersRequest,
): Promise<Submission> => {
  try {
    const assessment = await db.assessment.findUnique({
      where: { id: data.assessmentId },
      include: { questions: true },
    });

    if (!assessment) {
      throw new APIError("Assessment not found", "ASSESSMENT_NOT_FOUND");
    }

    const submission = await db.submission.create({
      data: {
        assessmentId: data.assessmentId,
        studentId: data.studentId,
        answers: data.answers,
        submittedAt: new Date(),
        grade: 0,
      },
    });

    const studentAnswers = JSON.parse(data.answers);
    let totalScore = 0;

    assessment.questions.forEach((question) => {
      if (question.type === "MCQ") {
        const correctAnswer = question.answer;
        const studentAnswer = studentAnswers[question.id];

        if (studentAnswer === correctAnswer) {
          totalScore += question.points;
        }
      }
    });

    const updatedSubmission = await db.submission.update({
      where: { id: submission.id },
      data: { grade: totalScore },
    });

    return updatedSubmission;
  } catch (error) {
    console.error("Failed to submit answers:", error);
    throw new APIError("Failed to submit answers", "SUBMISSION_FAILED");
  }
};

export interface AssessmentDetails extends Assessment {
  questions: Question[];
  submissions: Submission[];
}

export const submitAssignment = async (
  data: SubmitAssignmentRequest,
): Promise<Submission> => {
  try {
    const assessment = await db.assessment.findUnique({
      where: { id: data.assessmentId },
    });
    if (!assessment || assessment.type !== "assignment") {
      throw new APIError(
        "Invalid assessment type or not found",
        "INVALID_ASSESSMENT",
      );
    }

    const submission = await db.submission.create({
      data: {
        assessmentId: data.assessmentId,
        studentId: data.studentId,
        assignmentContent: JSON.stringify(data.assignmentContent),
        submittedAt: new Date(),
      },
    });

    return submission;
  } catch (error) {
    console.error("Failed to submit assignment:", error);
    throw new APIError("Failed to submit assignment", "SUBMISSION_FAILED");
  }
};

export const fetchAssessmentDetails = async (
  data: fetchAssessmentDetailsRequest,
): Promise<AssessmentDetails> => {
  try {
    const assessment = await db.assessment.findUnique({
      where: { id: data.assessmentId },
      include: {
        questions: true,
        submissions: true,
      },
    });

    if (!assessment) {
      throw new APIError("Assessment not found", "ASSESSMENT_NOT_FOUND");
    }

    return assessment;
  } catch (error) {
    console.error("Failed to fetch assessment details:", error);
    throw new APIError("Failed to fetch assessment details", "FETCH_FAILED");
  }
};

export const manualGradeSubmission = async (
  data: ManualGradeSubmissionRequest,
): Promise<Submission> => {
  const { submissionId, saqGrades } = data;

  const submission = await db.submission.findUnique({
    where: { id: submissionId },
  });

  if (!submission) {
    throw new APIError("Submission not found", "SUBMISSION_NOT_FOUND");
  }

  const newTotalGrade = (submission.grade || 0) + saqGrades;

  const updatedSubmission = await db.submission.update({
    where: { id: submissionId },
    data: {
      grade: newTotalGrade,
    },
  });

  return updatedSubmission;
};

export const assignmentGradeSubmission = async (
  data: AssignmentGradeSubmissionRequest,
): Promise<Submission> => {
  try {
    const { submissionId, grades, feedback } = data;

    const existingSubmission = await db.submission.findUnique({
      where: { id: submissionId },
    });

    if (!existingSubmission) {
      throw new APIError("Submission not found", "SUBMISSION_NOT_FOUND");
    }

    const updatedSubmission = await db.submission.update({
      where: { id: submissionId },
      data: {
        grade: grades,
        feedback: feedback,
      },
    });

    return updatedSubmission;
  } catch (error) {
    console.error("Failed to grade the assignment:", error);
    throw new APIError("Failed to update the submission", "UPDATE_FAILED");
  }
};
