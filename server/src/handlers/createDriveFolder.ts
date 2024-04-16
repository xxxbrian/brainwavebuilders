import { CreateDriveFolderRequest, CreateDriveFolderResponse } from "@/apis";
import { newDriveFolder } from "@/data/drive";

// createDriveFolder implements the createDriveFolder endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const createDriveFolder = async (
  ctx: any,
  request: CreateDriveFolderRequest,
): Promise<CreateDriveFolderResponse> => {
  const { newFolderName, parentFolderID } = request;
  const folderInfo = await newDriveFolder(newFolderName, parentFolderID);
  return { folderInfo };
};
