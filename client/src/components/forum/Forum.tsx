"use client";

import { Thread, Forum as ForumType, Post } from "@/backend";
import { ThreadList } from "./ThreadList";
import { useCallback, useEffect, useReducer, useState } from "react";
import { CenteredLoading } from "../loading";
import { useBackend } from "@/hooks/useBackend";
import { initialState, reducer } from "./Forum.reducer";
import { NewThreadDisplay } from "./NewThreadDisplay";
import { ThreadDisplay } from "./ThreadDisplay";
import { JSONContent } from "novel";

interface Props {
  forum: ForumType;
  threads: Thread[];
  activeThreadId: string;
  onCreateThreadAndPost: (title: string, content: JSONContent) => void;
  onClickCancelNewThread: () => void;

  onClickThread: (thread: Thread | null) => void;
  onUpsertThread: (thread: Thread) => void;
  onDeleteThread: (thread: Thread) => void;
  onUpsertPost: (post: Post) => void;
  onDeletePost: (post: Post) => void;
  onClickNewThread: () => void;
  isCreatingNewThread: boolean;
  isLoading: boolean;
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
  onClickCancelNewThread: onCancelNewThread,
  onCreateThreadAndPost,
  isCreatingNewThread,
  isLoading,
}) => {
  const onClickCancelNewThread = useCallback(() => {
    onCancelNewThread();
  }, [onCancelNewThread]);

  const getDisplay = () => {
    if (isCreatingNewThread) {
      return (
        <NewThreadDisplay
          onClickCreateThreadAndPost={onCreateThreadAndPost}
          onClickCancel={onClickCancelNewThread}
        />
      );
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

  if (isLoading) {
    return <CenteredLoading />;
  }

  return (
    <div className="flex h-full overflow-hidden">
      <ThreadList
        activeThreadId={activeThreadId}
        threads={threads}
        className="w-1/5 min-w-48 border-r border-gray-300 h-full sticky"
        onClickThread={onClickThread}
        onClickNewThread={onClickNewThread}
      />
      <div className="w-full h-full overflow-hidden">{getDisplay()}</div>
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
    (t: Thread | null) => {
      onChangeActiveThreadId(t?.id ?? null);
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

  const onCreateThreadAndPost = useCallback(
    async (title: string, content: JSONContent) => {
      onChangeActiveThreadId(null);

      const { thread } = await backend.upsertThread({
        thread: {
          createdAt: 0,
          forumID: forumId,
          id: "",
          posts: [],
          title,
          updatedAt: 0,
        },
      });

      await backend.upsertPost({
        post: {
          content,
          createdAt: 0,
          id: "",
          threadID: thread.id,
          updatedAt: 0,
        },
      });

      await reloadThreads();

      onChangeActiveThreadId(thread.id);
    },
    [backend, forumId, onChangeActiveThreadId, reloadThreads],
  );

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
    if (activeThreadId !== null) {
      dispatch({ type: "set-creating-new-thread", isCreatingNewThread: false });
    }
  }, [activeThreadId]);

  const onClickNewThread = useCallback(() => {
    dispatch({ type: "set-creating-new-thread", isCreatingNewThread: true });
    onChangeActiveThreadId(null);
  }, [onChangeActiveThreadId]);

  const onClickCancelNewThread = useCallback(() => {
    dispatch({ type: "set-creating-new-thread", isCreatingNewThread: false });
    onChangeActiveThreadId(null);
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
      onCreateThreadAndPost={onCreateThreadAndPost}
      onDeleteThread={onDeleteThread}
      onUpsertPost={onUpsertPost}
      onDeletePost={onDeletePost}
      onClickNewThread={onClickNewThread}
      onClickCancelNewThread={onClickCancelNewThread}
      isCreatingNewThread={s.isCreatingNewThread}
      isLoading={s.isLoading}
    />
  );
};
