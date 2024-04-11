import { Post, Thread } from "@/backend";

interface Props {
  onDeletePost: (post: Post) => void;
  onDeleteThread: (thread: Thread) => void;
  onUpsertPost: (post: Post) => void;
  onUpsertThread: (thread: Thread) => void;
}

export const ThreadDisplay: React.FC<Props> = () => {
  return (
    <div>
      <h1>ThreadDisplay</h1>
    </div>
  );
};
