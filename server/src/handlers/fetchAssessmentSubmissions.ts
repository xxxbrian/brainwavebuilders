import {
  FetchAssessmentSubmissionsRequest,
  FetchAssessmentSubmissionsResponse,
  APIError,
} from "@/apis";
import { fetchAssessmentSubmissions as fetchSubmissionsData } from "@/data/assessment";
import { formatSubmission } from "@/converts/assessment";

// fetchAssessmentSubmissions implements the fetchAssessmentSubmissions endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const fetchAssessmentSubmissions = async (
  ctx: any,
  request: FetchAssessmentSubmissionsRequest,
): Promise<FetchAssessmentSubmissionsResponse> => {
  try {
    const submissions = await fetchSubmissionsData(request);
    const formattedSubmissions = submissions.map((submission) =>
      formatSubmission(submission),
    );
    return { submissions: formattedSubmissions };
  } catch (error) {
    console.error("Error in fetchAssessmentSubmissions handler:", error);
    throw new APIError("Failed to fetch submissions", "FETCH_ERROR");
  }
};
