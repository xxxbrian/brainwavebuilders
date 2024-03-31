import { Assessment as AssessmentDB, Submission as SubmissionDB, Question as QuestionDB } from "@prisma/client";
import { Assessment as AssessmentAPI, Submission as SubmissionAPI, Question as QuestionAPI } from "@/apis";

export const formatAssessment = (assessment: AssessmentDB): AssessmentAPI => {
    return {
      id: assessment.id,
      title: assessment.title,
      description: assessment.description ?? undefined,
      courseCode: assessment.courseCode,
      startDate: assessment.startDate ? assessment.startDate.toISOString() : undefined,
      dueDate: assessment.dueDate ? assessment.dueDate.toISOString() : undefined,
      duration: assessment.duration ?? undefined,
      type: assessment.type,
    };
}

export const formatSubmission = (submission: SubmissionDB): SubmissionAPI => {
    return {
      id: submission.id,
      assessmentId: submission.assessmentId,
      studentId: submission.studentId,
      submittedAt: submission.submittedAt ? submission.submittedAt.toISOString() : undefined,
      fileUrl: submission.fileUrl ?? undefined,
      answers: JSON.stringify(submission.answers ?? {}),
      grade: submission.grade ?? undefined,
    };
};


export const formatQuestion = (question: QuestionDB): QuestionAPI => {
    return {
      id: question.id,
      assessmentId: question.assessmentId,
      title: question.title,
      type: question.type,
      options: question.options ? JSON.stringify(question.options) : undefined,
      points: question.points,
    };
};