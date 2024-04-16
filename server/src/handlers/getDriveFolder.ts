import { GetDriveFolderRequest, GetDriveFolderResponse } from "@/apis";
import { getDriveFolderByID } from "@/data/drive";

// getDriveFolder implements the getDriveFolder endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const getDriveFolder = async (
  ctx: any,
  request: GetDriveFolderRequest,
): Promise<GetDriveFolderResponse> => {
  const { folderID } = request;
  const folder = await getDriveFolderByID(folderID);
  return { folder };
};
