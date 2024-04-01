import { FetchAssessmentDetailsRequest, FetchAssessmentDetailsResponse, APIError } from "@/apis";
import { fetchAssessmentDetails as fetchDetailsFromDB } from "@/data/assessment";
import { formatAssessment, formatQuestion, formatSubmission } from "@/converts/assessment";

// fetchAssessmentDetails implements the fetchAssessmentDetails endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const fetchAssessmentDetails = async (request: FetchAssessmentDetailsRequest): Promise<FetchAssessmentDetailsResponse> => {
    try {
        const { assessment, questions, submissions } = await fetchDetailsFromDB(request);

        const formattedAssessment = formatAssessment(assessment);
        const formattedQuestions = questions.map(formatQuestion);
        const formattedSubmissions = submissions.map(formatSubmission);

        return {
            assessment: formattedAssessment,
            questions: formattedQuestions,
            submissions: formattedSubmissions,
        };

    } catch (error) {
        console.error("Error in fetchAssessmentDetails handler:", error);

        if (error instanceof APIError) {
            throw error;
        }

        throw new APIError("Failed to fetch assessment details", "FETCH_FAILED");
    }
};