import {
  FetchAssessmentDetailsRequest,
  FetchAssessmentDetailsResponse,
  APIError,
} from "@/apis";
import { fetchAssessmentDetails as fetchDetailsFromDB } from "@/data/assessment";
import { formatAssessment } from "@/converts/assessment";

// fetchAssessmentDetails implements the fetchAssessmentDetails endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const fetchAssessmentDetails = async (
  ctx: any,
  request: FetchAssessmentDetailsRequest,
): Promise<FetchAssessmentDetailsResponse> => {
  // TODO: Auth

  try {
    const assessment = await fetchDetailsFromDB(request);

    const formattedAssessment = formatAssessment(assessment);

    return { assessment: formattedAssessment };
  } catch (error) {
    console.error("Error in fetchAssessmentDetails handler:", error);

    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError("Failed to fetch assessment details", "FETCH_FAILED");
  }
};
