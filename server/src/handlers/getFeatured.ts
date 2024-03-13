import { GetFeaturedRequest, GetFeaturedResponse } from "@/apis";

// getFeatured implements the getFeatured endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getFeatured = async (
  request: GetFeaturedRequest,
): Promise<GetFeaturedResponse> => {
  return {
    featured: {
      background:
        "https://images.unsplash.com/photo-1710185220451-53c7a9b00a78",
      description:
        "This is a test description, this is a test description, this is a test description",
      title: "This is a test title",
    },
  };
};
