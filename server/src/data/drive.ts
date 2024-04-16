import { db } from "@/globals";
import { APIError } from "@/apis";
import { DriveFolder } from "@/apis";

export const newDriveFolder = async (
  name: string,
  parentFolderID: string,
): Promise<string> => {
  const folder = await db.folder.create({
    data: {
      name,
      parentID: parentFolderID,
    },
  });
  return folder.id;
};

export const addDriveFile = async (
  url: string,
  name: string,
  folderID: string,
): Promise<string> => {
  const file = await db.files.create({
    data: {
      url,
      name,
      folderId: folderID,
    },
  });
  return file.id;
};
