import React, { useCallback } from "react";
import { Card, Text, Box, Badge, Inset } from "@radix-ui/themes";
import defaultCourseImg from "@/assets/unsw.png";
import { DriveFolderInfo } from "@/backend";
import { DriveItem } from "@/backend";

export type DriveCardProps = {
  content: DriveFolderInfo | DriveItem;
  onClick?: (content: DriveFolderInfo | DriveItem) => void;
};

function isDriveItem(content: any): content is DriveItem {
  return "url" in content;
}

function getContentType(content: DriveFolderInfo | DriveItem): string {
  if (isDriveItem(content)) {
    return "File";
  } else {
    return "Folder";
  }
}

export const DriveCard: React.FC<DriveCardProps> = ({ content, onClick }) => {
  const { name } = content;

  const contentType = getContentType(content);

  const onClickInner = useCallback(() => {
    onClick?.(content);
  }, [content, onClick]);

  return (
    <Box maxWidth="240px">
      <Card
        className="
    overflow-hidden
    max-w-sm
    transform
    cursor-pointer h-fit"
        onClick={onClickInner}
      >
        {/* Header Image */}
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={defaultCourseImg.src}
            alt="Course"
            className="object-cover"
          />
        </Inset>

        {/* Content */}
        <div className="pb-2">
          {/* Course Name and Description */}
          <Box className="mt-3">
            {/* File/Folder Name */}
            <div>
              <Text trim="both" className="text-based font-bold ">
                {name}
              </Text>
            </div>
          </Box>
          <Badge>{contentType}</Badge>
        </div>
      </Card>
    </Box>
  );
};
