import { getAnnouncements as getAnnouncementsDB } from "@/data/forum";
import { GetAnnouncementsRequest, GetAnnouncementsResponse } from "@/apis";
import { useCurrentUser } from "@/context/auth";
import { getUserCourseMembership } from "@/data/course";
import { threadWithPostsDBToAPI } from "@/converts/forum";

// getAnnouncements implements the getAnnouncements endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getAnnouncements = async (
  ctx: any,
  { courseIDs }: GetAnnouncementsRequest,
): Promise<GetAnnouncementsResponse> => {
  const user = useCurrentUser(ctx)!;

  const ids =
    courseIDs ??
    (await getUserCourseMembership(user.id)).map((c) => c.courseID);

  const threads = await getAnnouncementsDB(ids);
  return {
    threads: threads.map(threadWithPostsDBToAPI),
  };
};
