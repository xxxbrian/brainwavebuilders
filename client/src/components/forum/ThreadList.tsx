"use client";

import { Thread } from "@/backend";

export const ThreadCard = () => {
  return (
    <div>
      <h1>Thread Card</h1>
    </div>
  );
};

interface ListProps {
  activeThreadId: string;
  threads: Thread[];
  className?: string;
}

export const ThreadList: React.FC<ListProps> = ({
  activeThreadId,
  threads,
  className,
}) => {
  return (
    <div className={`overflow-x-hidden overflow-y-auto ${className ?? ""}`}>
      <h1>Thread List</h1>
    </div>
  );
};
