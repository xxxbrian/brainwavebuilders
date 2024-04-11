import { Post, Thread } from "@/backend";
import { Button } from "@radix-ui/themes";
import { JSONContent } from "novel";
import { useCallback, useState } from "react";
import { AdvancedEditor } from "../editor/AdvancedEditor";
import { PostDisplay } from "./PostDisplay";

interface Props {
  onDeletePost: (post: Post) => void;
  onDeleteThread: (thread: Thread) => void;
  onUpsertPost: (post: Post) => void;
  onUpsertThread: (thread: Thread) => void;
  thread: Thread;
}

export const ThreadDisplay: React.FC<Props> = ({ thread, onUpsertPost }) => {
  const [draftContent, setDraftContent] = useState<JSONContent>({
    type: "doc",
    content: [],
  });

  const onClickPost = useCallback(() => {
    onUpsertPost({
      content: draftContent,
      createdAt: 0,
      id: "",
      threadID: thread.id,
      updatedAt: 0,
    });

    setDraftContent({ type: "doc", content: [] });
  }, [draftContent, onUpsertPost, thread.id]);

  return (
    <div className="flex flex-col px-4 py-4 space-y-4">
      <div className="text-4xl mb-8">{thread.title}</div>

      {thread.posts.map((post) => (
        <PostDisplay post={post} key={post.id} />
      ))}

      <div className="text-2xl mt-12">Reply</div>

      <AdvancedEditor
        className="border rounded-md overflow-y-auto overflow-x-hidden max-h-[50vh] border-gray-300 p-12 px-8 sm:px-12"
        value={draftContent}
        setValue={setDraftContent}
      />

      <div className="flex justify-end space-x-2">
        <Button onClick={onClickPost} variant="solid">
          Post
        </Button>
      </div>
    </div>
  );
};
