"use client";

import { Thread, Forum as ForumType, Post } from "@/backend";
import { ThreadList } from "./ThreadList";
import { useCallback, useEffect, useReducer, useState } from "react";
import { CenteredLoading } from "../loading";
import { useBackend } from "@/hooks/useBackend";
import { initialState, reducer } from "./Forum.reducer";
import { NewThreadDisplay } from "./NewThreadDisplay";
import { ThreadDisplay } from "./ThreadDisplay";

interface Props {
  forum: ForumType;
  threads: Thread[];
  activeThreadId: string;
  onClickThread: (thread: Thread) => void;
  onUpsertThread: (thread: Thread) => void;
  onDeleteThread: (thread: Thread) => void;
  onUpsertPost: (post: Post) => void;
  onDeletePost: (post: Post) => void;
  onClickNewThread: () => void;
  isCreatingNewThread: boolean;
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
  onClickNewThread,
  isCreatingNewThread,
}) => {
  const getDisplay = () => {
    if (isCreatingNewThread) {
      return <NewThreadDisplay onUpsertThread={onUpsertThread} />;
    } else if (activeThreadId) {
      return (
        <ThreadDisplay
          onDeletePost={onDeletePost}
          onDeleteThread={onDeleteThread}
          onUpsertPost={onUpsertPost}
          onUpsertThread={onUpsertThread}
        />
      );
    } else {
      return <div />;
    }
  };
  return (
    <div className="flex h-full">
      <ThreadList
        activeThreadId={activeThreadId}
        threads={threads}
        className="w-1/5 min-w-48 border-r border-gray-300 h-full"
        onClickThread={onClickThread}
        onClickNewThread={onClickNewThread}
      />
      <div className="flex-1">{getDisplay()}</div>
    </div>
  );
};

interface StatefulProps {
  forumId: string;
  activeThreadId: string;
  onChangeActiveThreadId: (threadId: string | null) => void;
}

export const StatefulForum: React.FC<StatefulProps> = ({
  forumId,
  onChangeActiveThreadId,
  activeThreadId,
}) => {
  const [s, dispatch] = useReducer(reducer, initialState());

  const backend = useBackend();

  const onClickThread = useCallback(
    (t: Thread) => {
      onChangeActiveThreadId(t.id);
    },
    [onChangeActiveThreadId],
  );

  const reloadThreads = useCallback(async () => {
    dispatch({ type: "set-loading", isLoading: true });

    const { threads } = await backend.getThreads({
      forumID: forumId,
    });

    dispatch({ type: "load-threads", threads });
  }, [backend, forumId]);

  const onUpsertThread = useCallback(
    async (t: Thread) => {
      await backend.upsertThread({
        thread: t,
      });

      await reloadThreads();
    },
    [backend, reloadThreads],
  );

  const onDeleteThread = useCallback(
    async (t: Thread) => {
      await backend.deleteThread({
        threadID: t.id,
      });

      await reloadThreads();
    },
    [backend, reloadThreads],
  );

  const onUpsertPost = useCallback(
    async (p: Post) => {
      await backend.upsertPost({
        post: p,
      });

      await reloadThreads();
    },
    [backend, reloadThreads],
  );

  const onDeletePost = useCallback(
    async (p: Post) => {
      await backend.deletePost({
        postID: p.id,
      });

      await reloadThreads();
    },
    [backend, reloadThreads],
  );

  useEffect(() => {
    dispatch({ type: "set-creating-new-thread", isCreatingNewThread: false });
  }, [activeThreadId]);

  const onClickNewThread = useCallback(() => {
    onChangeActiveThreadId(null);
    dispatch({ type: "set-creating-new-thread", isCreatingNewThread: true });
  }, [onChangeActiveThreadId]);

  useEffect(() => {
    const inner = async () => {
      const { forum } = await backend.getForumByID({
        id: forumId,
      });

      dispatch({ type: "load-forum", forum });

      await reloadThreads();
    };

    void inner();
  }, [backend, forumId, reloadThreads]);

  useEffect(() => {
    void reloadThreads();
  }, [reloadThreads]);

  if (!s.forum) {
    return <CenteredLoading />;
  }

  return (
    <Forum
      forum={s.forum}
      threads={s.threads}
      activeThreadId={activeThreadId}
      onClickThread={onClickThread}
      onUpsertThread={onUpsertThread}
      onDeleteThread={onDeleteThread}
      onUpsertPost={onUpsertPost}
      onDeletePost={onDeletePost}
      onClickNewThread={onClickNewThread}
      isCreatingNewThread={s.isCreatingNewThread}
    />
  );
};
