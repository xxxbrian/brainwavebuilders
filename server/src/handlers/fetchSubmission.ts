import {
  FetchSubmissionRequest,
  FetchSubmissionResponse,
  APIError,
} from "@/apis";
import { fetchSubmission as fetchSubmissionData } from "@/data/assessment";
import { formatSubmission } from "@/converts/assessment";

// fetchSubmission implements the fetchSubmission endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const fetchSubmission = async (
  ctx: any,
  request: FetchSubmissionRequest,
): Promise<FetchSubmissionResponse> => {
  try {
    const submission = await fetchSubmissionData(request);
    const formattedSubmission = formatSubmission(submission);
    return { submission: formattedSubmission };
  } catch (error) {
    console.error("Error in fetchSubmission handler:", error);
    throw new APIError("Failed to fetch submission", "FETCH_ERROR");
  }
};
