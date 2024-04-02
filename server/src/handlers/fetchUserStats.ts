import { FetchUserStatsRequest, FetchUserStatsResponse } from "@/apis";

// fetchUserStats implements the fetchUserStats endpoint.
// TODO: Implement this
export const fetchUserStats = async (
  request: FetchUserStatsRequest,
): Promise<FetchUserStatsResponse> => {
  return {
    stats: {
      coursesCompleted: 12,
      coursesInProgress: 5,
      tasksFinished: 348,
    },
  };
};
