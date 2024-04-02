import { db } from "@/globals";
import { Assessment, Submission, Question } from "@prisma/client";
import { APIError } from "@/apis";
import {
  CreateAssessmentRequest,
  SubmitAnswersRequest,
  SubmitAssignmentRequest,
  CreateQuestionRequest,
  FetchAssessmentDetailsRequest,
} from "@/apis";

// Extend the CreateAssessmentRequest to include an optional array of questions
interface ExtendedCreateAssessmentRequest extends CreateAssessmentRequest {
  questions?: {
    title: string;
    type: string;
    options?: string;
    points: number;
  }[];
}

export const createAssessment = async (
  data: ExtendedCreateAssessmentRequest,
): Promise<Assessment> => {
  try {
    const courseExists = await db.course.findUnique({
      where: {
        code: data.courseCode,
      },
    });
    if (!courseExists) {
      throw new APIError("Course not found", "COURSE_NOT_FOUND");
    }

    // Use a transaction if creating both assessments and questions
    const assessment = await db.$transaction(async (transactionalDb) => {
      const createdAssessment = await transactionalDb.assessment.create({
        data: {
          title: data.title,
          description: data.description,
          courseCode: data.courseCode,
          startDate: data.startDate ? new Date(data.startDate) : undefined,
          dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
          duration: data.duration,
          type: data.type,
        },
      });

      // If questions are provided, create them using the transactional client
      if (data.questions && data.questions.length > 0) {
        await Promise.all(
          data.questions.map((question) =>
            transactionalDb.question.create({
              data: {
                assessmentId: createdAssessment.id,
                title: question.title,
                type: question.type,
                options: question.options
                  ? JSON.parse(question.options)
                  : undefined,
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
    const assessmentExists = await db.assessment.findUnique({
      where: { id: data.assessmentId },
    });
    if (!assessmentExists) {
      throw new APIError("Assessment not found", "ASSESSMENT_NOT_FOUND");
    }

    const submission = await db.submission.create({
      data: {
        assessmentId: data.assessmentId,
        studentId: data.studentId,
        answers: data.answers,
        submittedAt: new Date(),
      },
    });

    return submission;
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
        fileUrl: data.fileUrl,
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
  data: FetchAssessmentDetailsRequest,
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

export const createQuestion = async (
  data: CreateQuestionRequest,
): Promise<Question> => {
  try {
    const assessmentExists = await db.assessment.findUnique({
      where: { id: data.assessmentId },
    });

    if (!assessmentExists) {
      throw new APIError("Assessment not found", "ASSESSMENT_NOT_FOUND");
    }

    const question = await db.question.create({
      data: {
        assessmentId: data.assessmentId,
        title: data.title,
        type: data.type,
        options: data.options ? JSON.parse(data.options) : undefined,
        points: data.points,
      },
    });

    return question;
  } catch (error) {
    console.error("Failed to create question:", error);
    throw new APIError("Failed to create question", "CREATION_FAILED");
  }
};
