import { SubmitAssignmentRequest, SubmitAssignmentResponse } from "@/apis";
import { submitAssignment as submitAssignmentData } from "@/data/assessment";
import { formatSubmission as formatSubmissionResponse } from "@/converts/assessment";
import { APIError } from "@/apis";

// submitAssignment implements the submitAssignment endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const submitAssignment = async (
  ctx: any,
  request: SubmitAssignmentRequest,
): Promise<SubmitAssignmentResponse> => {
  // TODO: Auth

  try {
    const submission = await submitAssignmentData(request);

    return { submission: formatSubmissionResponse(submission) };
  } catch (error) {
    console.error("Error in submitAssignment handler:", error);

    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError("Failed to submit assignment", "SUBMISSION_ERROR");
  }
};
