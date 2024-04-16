"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { ContextMenu, Button, IconButton, Text } from "@radix-ui/themes";
import { MdDriveFolderUpload } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { MdFolderOpen } from "react-icons/md";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import { DriveCard } from "@/components/drive/DriveCard";
import { DriveItem, DriveFolderInfo, DriveFolder } from "@/backend";
import { useBackend } from "@/hooks/useBackend";
import { useParams } from "next/navigation";

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

  const backend = useBackend();

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
    const url = "https://example.com";
    try {
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

  const download = useCallback(async (url: string) => {
    // let browser handle download
    window.open(url);
  }, []);

  return (
    <div className="flex flex-col space-y-10 p-10 h-full">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row space-x-4 items-center">
          {folder?.parentFolderId && (
            <IconButton radius="full" variant="soft" size="3">
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
            <div className="grid grid-cols-5 gap-10">
              {items.map((item, index) => (
                <ContextMenu.Root key={index}>
                  <ContextMenu.Trigger>
                    <div>
                      <DriveCard
                        content={item}
                        onClick={
                          isFolder(item)
                            ? (item: DriveFolderInfo) => {
                                // navigate to folder
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
          <ContextMenu.Item>
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
      </ContextMenu.Root>
    </div>
  );
};

export default DriveFolderPage;
