"use client";

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

const DriveFolderPage: React.FC = () => {
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
        <Button size="3">
          <MdDriveFolderUpload size={20} /> Upload
        </Button>
      </div>
      {/* Main Content */}

      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <div className="h-full bg-gray-200 rounded-3xl p-10">
            <div className="grid grid-cols-5 gap-10">
              {Array.from({ length: 1000 }).map((_, index) => (
                <ContextMenu.Root key={index}>
                  <ContextMenu.Trigger>
                    <Card size="2" className="hover:shadow-xl">
                      <Inset clip="padding-box" side="top" pb="current">
                        <img
                          src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
                          alt="Bold typography"
                          style={{
                            display: "block",
                            objectFit: "cover",
                            width: "100%",
                            height: 140,
                            backgroundColor: "var(--gray-5)",
                          }}
                        />
                      </Inset>
                      <Text as="p" size="3">
                        <Strong>Typography</Strong> is the art and technique of
                        arranging type to make written language legible,
                        readable and appealing when displayed.
                      </Text>
                    </Card>
                  </ContextMenu.Trigger>
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
