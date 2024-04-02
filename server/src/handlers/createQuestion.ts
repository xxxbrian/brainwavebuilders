import {
  CreateQuestionRequest,
  CreateQuestionResponse,
  APIError,
} from "@/apis";
import { createQuestion as createQuestionData } from "@/data/assessment";
import { formatQuestion as formatQuestionResponse } from "@/converts/assessment";

// createQuestion implements the createQuestion endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const createQuestion = async (
  ctx: any,
  request: CreateQuestionRequest,
): Promise<CreateQuestionResponse> => {
  try {
    const question = await createQuestionData(request);

    return { question: formatQuestionResponse(question) };
  } catch (error) {
    console.error("Error in createQuestion handler:", error);

    if (error instanceof APIError) {
      throw error;
    }

    throw new APIError("Failed to create question", "CREATION_ERROR");
  }
};
