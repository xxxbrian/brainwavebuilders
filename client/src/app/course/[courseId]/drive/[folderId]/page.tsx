"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ContextMenu, Button, IconButton, Text } from "@radix-ui/themes";
import { MdDriveFolderUpload } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { MdFolderOpen } from "react-icons/md";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import { DriveCard } from "@/components/drive/DriveCard";
import { DriveItem, DriveFolderInfo, DriveFolder } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
import { useParams } from "next/navigation";
import { CreateFolderPopup } from "@/components/drive/CreateFolderPopup";
import { usePathname, useRouter } from "next/navigation";

type DriveDirEnt = DriveItem | DriveFolderInfo;
type DriveItems = DriveDirEnt[];

const isFolder = (dirent: DriveDirEnt): boolean => {
  return !Object.prototype.hasOwnProperty.call(dirent, "url");
};

const DriveFolderPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const [items, setItems] = React.useState<DriveItems>([]);

  const { folderId } = useParams<{ folderId: string }>();
  const [folder, setFolder] = React.useState<DriveFolder | null>(null);

  const [isCreateFolderPopup, setIsCreateFolderPopup] = useState(false);

  const backend = useBackend();

  const router = useRouter();

  const pathName = usePathname();

  useEffect(() => {
    const inner = async () => {
      if (!folderId) return;
      const { folder } = await backend.getDriveFolder({
        folderID: folderId,
      });
      setFolder(folder);
      setItems(folder.items);
    };
    void inner();
  }, [folderId, backend]);

  const uploadFile = async (file: File) => {
    // mock upload
    console.log("Uploading file", file.name);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      // no-cors mode
      const response = await fetch("https://file.quick.to/upload", {
        method: "POST",
        body: formData,
      });
      console.log(response);
      const fileId = await response.text();
      const url = `https://file.quick.to/storage/${fileId}`;
      const { item } = await backend.addDriveItem({
        url,
        name: file.name,
        folderID: folderId,
      });
      setItems((prev) => [...prev, item]);
    } catch (error) {
      console.error(error);
    }
  };

  const createNewFolder = useCallback(
    async (name: string) => {
      try {
        const { folderInfo } = await backend.createDriveFolder({
          newFolderName: name,
          parentFolderID: folderId,
        });
        setItems((prev) => [...prev, folderInfo]);
      } catch (error) {
        console.error(error);
      }
    },
    [folderId, backend],
  );

  const download = useCallback(async (url: string) => {
    // let browser handle download
    window.open(url);
  }, []);

  return (
    <div className="flex flex-col space-y-10 p-10 h-full">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row space-x-4 items-center">
          {folder?.parentFolderId && (
            <IconButton
              radius="full"
              variant="soft"
              size="3"
              onClick={() => {
                const newPath = pathName.replace(
                  /\/[^\/]+$/,
                  "/" + folder?.parentFolderId,
                );
                void router.push(newPath);
                console.log("Navigate to folder", folder?.parentFolderId);
              }}
            >
              <div className="pl-2">
                <MdArrowBackIos />
              </div>
            </IconButton>
          )}
          <Text size="6" weight="bold">
            {folder?.name ?? "Loading..."}
          </Text>
        </div>
        <Button
          color="indigo"
          variant="soft"
          size="3"
          onClick={handleUploadClick}
        >
          <MdDriveFolderUpload size={20} /> Upload
        </Button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(event) => {
          const files = event.target.files;
          if (files) {
            void uploadFile(files[0]!);
          }
        }}
      />
      {/* Main Content */}

      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div className="h-full bg-gray-200 rounded-3xl p-10">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-10">
              {items.map((item, index) => (
                <ContextMenu.Root key={index}>
                  <ContextMenu.Trigger>
                    <div>
                      <DriveCard
                        content={item}
                        previewImg={
                          isFolder(item) ? undefined : (item as DriveItem).url
                        }
                        onClick={
                          isFolder(item)
                            ? (item: DriveFolderInfo) => {
                                const newPath = pathName.replace(
                                  /\/[^\/]+$/,
                                  "/" + item.id,
                                );
                                void router.push(newPath);
                                console.log("Navigate to folder", item.id);
                              }
                            : undefined
                        }
                      />
                    </div>
                  </ContextMenu.Trigger>
                  <ContextMenu.Content size="2">
                    <ContextMenu.Item disabled={!isFolder(item)}>
                      Open
                    </ContextMenu.Item>
                    <ContextMenu.Item
                      disabled={isFolder(item)}
                      onClick={async () => {
                        if (isFolder(item)) return;
                        await download((item as DriveItem).url);
                      }}
                    >
                      Download
                    </ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item>Copy Link</ContextMenu.Item>
                    <ContextMenu.Separator />
                    <ContextMenu.Item color="red">Delete</ContextMenu.Item>
                  </ContextMenu.Content>
                </ContextMenu.Root>
              ))}
            </div>
          </div>
        </ContextMenu.Trigger>
        <ContextMenu.Content size="2">
          <ContextMenu.Item
            onClick={() => {
              setIsCreateFolderPopup(true);
            }}
          >
            <div className="flex flex-row space-x-4 items-center">
              <Text>New Folder</Text>
              <MdFolderOpen width={24} height={24} />
            </div>
          </ContextMenu.Item>
          <ContextMenu.Item>
            <div className="flex flex-row space-x-4 items-center">
              <Text>Upload File</Text>
              <MdOutlineInsertDriveFile width={24} height={24} />
            </div>
          </ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Refresh</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Back</ContextMenu.Item>
        </ContextMenu.Content>
        <CreateFolderPopup
          isOpen={isCreateFolderPopup}
          setIsOpen={setIsCreateFolderPopup}
          createNewFolder={createNewFolder}
        />
      </ContextMenu.Root>
    </div>
  );
};

export default DriveFolderPage;
