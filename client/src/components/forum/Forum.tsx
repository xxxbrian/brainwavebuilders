"use client";

import { Thread, Forum as ForumType, Post } from "@/backend";
import { ThreadList } from "./ThreadList";
import { useCallback, useState } from "react";
import { CenteredLoading } from "../loading";
import { useBackend } from "@/hooks/useBackend";

interface Props {
  forum: ForumType;
  threads: Thread[];
  activeThreadId: string;
  onClickThread: (thread: Thread) => void;
  onUpsertThread: (thread: Thread) => void;
  onDeleteThread: (thread: Thread) => void;
  onUpsertPost: (post: Post) => void;
  onDeletePost: (post: Post) => void;
}

export const Forum: React.FC<Props> = ({
  forum,
  threads,
  activeThreadId,
  onClickThread,
  onDeletePost,
  onDeleteThread,
  onUpsertPost,
  onUpsertThread,
}) => {
  return (
    <div className="flex">
      <ThreadList
        activeThreadId={activeThreadId}
        threads={threads}
        className="w-1/5 min-w-48"
      />
      <div></div>
    </div>
  );
};

interface StatefulProps {
  forumId: string;
  activeThreadId: string;
  onChangeActiveThreadId: (threadId: string) => void;
}

export const StatefulForum: React.FC<StatefulProps> = ({
  forumId,
  onChangeActiveThreadId,
  activeThreadId,
}) => {
  const [forum, setForum] = useState<ForumType | null>(null);

  const onClickThread = useCallback(
    (t: Thread) => {
      onChangeActiveThreadId(t.id);
    },
    [onChangeActiveThreadId],
  );

  const backend = useBackend();

  // const onClickDeletePost;

  if (!forum) {
    return <CenteredLoading />;
  }

  return <></>;
};
