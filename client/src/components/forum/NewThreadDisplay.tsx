import { Thread } from "@/backend";

interface Props {
  onUpsertThread: (thread: Thread) => void;
}

export const NewThreadDisplay: React.FC<Props> = ({ onUpsertThread }) => {
  return (
    <div>
      <h1>New Thread</h1>
      {/* <AdvancedEditor /> */}
    </div>
  );
};
