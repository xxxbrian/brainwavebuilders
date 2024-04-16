"use client";

import React, { useRef } from "react";
import {
  Inset,
  Card,
  ContextMenu,
  Button,
  IconButton,
  Text,
  Strong,
} from "@radix-ui/themes";
import { MdDriveFolderUpload } from "react-icons/md";
import { MdArrowBackIos } from "react-icons/md";
import { MdFolderOpen } from "react-icons/md";
import { MdOutlineInsertDriveFile } from "react-icons/md";
import { DriveCard } from "@/components/drive/DriveCard";
import { fakeDriveItem } from "@/utils/data";

const DriveFolderPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col space-y-10 p-10 h-full">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row space-x-4 items-center">
          <IconButton radius="full" variant="soft" size="3">
            <div className="pl-2">
              <MdArrowBackIos />
            </div>
          </IconButton>
          <Text size="6" weight="bold">
            Folder Name
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
          // TODO Upload file here
          console.log(event.target.files);
        }}
      />
      {/* Main Content */}

      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div className="h-full bg-gray-200 rounded-3xl p-10">
            <div className="grid grid-cols-5 gap-10">
              {Array.from({ length: 1000 }).map((_, index) => (
                <ContextMenu.Root key={index}>
                  <DriveCard content={fakeDriveItem} />
                  <ContextMenu.Content size="2">
                    <ContextMenu.Item>Open</ContextMenu.Item>
                    <ContextMenu.Item>Download</ContextMenu.Item>
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
