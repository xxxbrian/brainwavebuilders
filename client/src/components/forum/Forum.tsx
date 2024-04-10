import { Thread, Forum as ForumType } from "@/backend";

interface Props {
  forum: ForumType;
  threads: Thread[];
  activeThreadId: string;
  onClickThread: (thread: Thread) => void;
}

export const Forum: React.FC<Props> = () => {
  return <></>;
};
