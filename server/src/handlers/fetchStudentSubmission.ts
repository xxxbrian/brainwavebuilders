import {
  FetchStudentSubmissionRequest,
  FetchStudentSubmissionResponse,
  APIError,
} from "@/apis";
import { fetchStudentSubmission as fetchSubmissionsData } from "@/data/assessment";
import { formatSubmission } from "@/converts/assessment";
import { useCurrentUser } from "@/context/auth";

// fetchStudentSubmission implements the fetchStudentSubmission endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const fetchStudentSubmission = async (
  ctx: any,
  request: FetchStudentSubmissionRequest,
): Promise<FetchStudentSubmissionResponse> => {
  try {
    const user = useCurrentUser(ctx)!;
    const submissions = await fetchSubmissionsData(request, user);
    const formattedSubmissions = submissions.map((submission) =>
      formatSubmission(submission),
    );
    return { submissions: formattedSubmissions };
  } catch (error) {
    console.error("Error in fetchSubmission handler:", error);
    throw new APIError("Failed to fetch submission", "FETCH_ERROR");
  }
};
