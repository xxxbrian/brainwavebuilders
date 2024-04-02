import { SubmitAnswersRequest, SubmitAnswersResponse } from "@/apis";
import { submitAnswers as submitAnswersData } from "@/data/assessment"; // Adjust path as necessary
import { formatSubmission as formatSubmissionResponse } from "@/converts/assessment"; // A hypothetical function to format response
import { APIError } from "@/apis";

// submitAnswers implements the submitAnswers endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.

export const submitAnswers = async (
  ctx: any,
  request: SubmitAnswersRequest,
): Promise<SubmitAnswersResponse> => {
  try {
    const submission = await submitAnswersData(request);

    return { submission: formatSubmissionResponse(submission) };
  } catch (error) {
    console.error("Error in submitAnswers handler:", error);

    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError("Failed to submit answers", "SUBMISSION_ERROR");
  }
};
