import { AdvancedEditor } from "@/components/editor/AdvancedEditor";
import { Button, TextField } from "@radix-ui/themes";
import { JSONContent } from "novel";
import { useCallback, useState } from "react";

interface Props {
  onClickCreateThreadAndPost: (title: string, content: JSONContent) => void;
  onClickCancel: () => void;
}

export const NewThreadDisplay: React.FC<Props> = ({
  onClickCreateThreadAndPost: onClickCreatePost,
  onClickCancel,
}) => {
  const [title, setTitle] = useState("");

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    },
    [],
  );

  const onClickPost = useCallback(() => {
    onClickCreatePost(title, {} as JSONContent);
  }, [onClickCreatePost, title]);

  return (
    <div className="flex flex-col px-4 py-4 space-y-4">
      <div className="text-2xl">Create Thread</div>
      <TextField.Root
        variant="surface"
        size={"3"}
        placeholder="Name the thread"
        value={title}
        onChange={onChangeTitle}
        className="w-full text-2xl"
      />

      <AdvancedEditor className="border rounded-md overflow-y-auto overflow-x-hidden max-h-[50vh] border-gray-300" />

      <div className="flex justify-end space-x-2">
        <Button onClick={onClickCancel} variant="surface">
          Cancel
        </Button>
        <Button onClick={onClickPost} variant="solid">
          Post
        </Button>
      </div>
    </div>
  );
};
