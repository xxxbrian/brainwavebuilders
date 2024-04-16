import { AddDriveItemRequest, AddDriveItemResponse } from "@/apis";
import { addDriveFile } from "@/data/drive";
import { DriveItem } from "@/apis";
// addDriveItem implements the addDriveItem endpoint.
// This code has been automatically generated.
// You can move this function to other files within the /app/server/src/handlers directory,
// as long as the signature remains the same and the function is exported.
export const addDriveItem = async (
  ctx: any,
  request: AddDriveItemRequest,
): Promise<AddDriveItemResponse> => {
  const { url, name, folderID } = request;
  const fileID = await addDriveFile(url, name, folderID);
  const item: DriveItem = {
    id: fileID,
    name,
    url,
  };
  return { item };
};
