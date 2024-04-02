import {
  FetchUserSevenDayActivityRequest,
  FetchUserSevenDayActivityResponse,
} from "@/apis";

// fetchUserSevenDayActivity implements the fetchUserSevenDayActivity endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const fetchUserSevenDayActivity = async (
  ctx: any,
  request: FetchUserSevenDayActivityRequest,
): Promise<FetchUserSevenDayActivityResponse> => {
  return {
    activity: {
      activities: [3, 5, 2, 1, 7, 8, 2],
    },
  };
};
