import { AddScheduleClassRequest, AddScheduleClassResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { createScheduleClass } from "@/data/calendar";

// addScheduleClass implements the addScheduleClass endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const addScheduleClass = async (
  ctx: any,
  request: AddScheduleClassRequest,
): Promise<AddScheduleClassResponse> => {
  const { scheduleClass } = request;
  const user = useCurrentUser(ctx);
  await createScheduleClass(user!.id, scheduleClass);
  return {};
};
