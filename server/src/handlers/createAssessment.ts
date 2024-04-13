import {
  CreateAssessmentRequest,
  CreateAssessmentResponse,
  APIError,
} from "@/apis";
import { createAssessment as createAssessmentData } from "@/data/assessment";
import { formatAssessment as formatAssessmentResponse } from "@/converts/assessment";

// createAssessment implements the createAssessment endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const createAssessment = async (
  ctx: any,
  request: CreateAssessmentRequest,
): Promise<CreateAssessmentResponse> => {
  // const userRole = ctx.user?.role;
  // if (userRole !== "TEACHER") {
  //   throw new APIError("Forbidden", "FORBIDDEN");
  // }
  validateRequest(request);

  try {
    const assessment = await createAssessmentData(request);

    const formattedAssessment = formatAssessmentResponse(assessment);

    return { assessment: formattedAssessment };
  } catch (error) {
    console.error("Error in createAssessment handler:", error);
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError("Failed to create assessment", "UNKNOWN_ERROR");
  }
};

function validateRequest(request: CreateAssessmentRequest) {
  if (!request.title || !request.courseId || !request.type) {
    throw new APIError("Missing required fields", "VALIDATION_ERROR");
  }
}
