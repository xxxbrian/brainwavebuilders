import {
  FetchAssessmentDetailsTeacherRequest,
  FetchAssessmentDetailsTeacherResponse,
  APIError,
} from "@/apis";
import { fetchAssessmentDetails as fetchDetailsFromDB } from "@/data/assessment";
import { formatAssessment } from "@/converts/assessment";

// fetchAssessmentDetailsTeacher implements the fetchAssessmentDetailsTeacher endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const fetchAssessmentDetailsTeacher = async (
  ctx: any,
  request: FetchAssessmentDetailsTeacherRequest,
): Promise<FetchAssessmentDetailsTeacherResponse> => {
  try {
    const assessmentDetails = await fetchDetailsFromDB(request);

    return { assessment: formatAssessment(assessmentDetails) };
  } catch (error) {
    console.error("Error in fetchAssessmentDetails handler:", error);

    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError(
      "Failed to fetch assessment details",
      "FETCH_ASSESSMENT_TEACHER_DETAILS_FAILED",
    );
  }
};
