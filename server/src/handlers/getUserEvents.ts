import { GetUserEventsRequest, GetUserEventsResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { fetchAllAssessmentsEventByUser } from "@/data/calendar";

// getUserEvents implements the getUserEvents endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getUserEvents = async (
  ctx: any,
  request: GetUserEventsRequest,
): Promise<GetUserEventsResponse> => {
  let user = useCurrentUser(ctx);
  let events = await fetchAllAssessmentsEventByUser(user?.id!);
  return {
    events,
  };
};
