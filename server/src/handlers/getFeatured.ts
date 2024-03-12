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
        "https://images.unsplash.com/photo-1682685795557-976f03aca7b2",
      description: "Test description",
      title: "Test title",
    },
  };
};
