"use client";

import "@/styles/prosemirror.css";
import React, { useEffect, useState } from "react";
import deepEqual from "deep-equal";
import {
  EditorRoot,
  EditorCommand,
  EditorCommandItem,
  EditorCommandEmpty,
  EditorContent,
  type JSONContent,
  EditorInstance,
  EditorCommandList,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { defaultExtensions } from "./extensions";
import { Separator } from "./ui/separator";
import { NodeSelector } from "./selectors/node-selector";
import { LinkSelector } from "./selectors/link-selector";
import { ColorSelector } from "./selectors/color-selector";

import { TextButtons } from "./selectors/text-buttons";
import { slashCommand, suggestionItems } from "./slash-command";
import GenerativeMenuSwitch from "./generative/generative-menu-switch";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
import { uploadFn } from "./image-upload";

const extensions = [...defaultExtensions, slashCommand];

interface Props {
  className?: string;
  value?: JSONContent;
  setValue?: (value: JSONContent) => void;
  isEditable?: boolean;
  onEditorChange?: (editor: EditorInstance) => void;
}

export const AdvancedEditor: React.FC<Props> = ({
  className,
  value,
  setValue,
  isEditable = true,
  onEditorChange,
}) => {
  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [openAI, setOpenAI] = useState(false);

  const [editor, setEditor] = useState<EditorInstance | null>(null);

  useEffect(() => {
    if (!editor) return;
    if (deepEqual(value, editor.getJSON())) return;

    editor.commands.setContent(value ?? {});
  }, [editor, value]);

  useEffect(() => {
    if (!editor) return;

    onEditorChange?.(editor);
  }, [editor, onEditorChange]);

  useEffect(() => {
    editor?.setEditable(isEditable);
  }, [editor, isEditable]);

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <EditorRoot>
        <EditorContent
          editable={isEditable}
          initialContent={value}
          extensions={extensions}
          className="relative w-full bg-background"
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) =>
              handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
            },
          }}
          onCreate={({ editor }) => {
            setEditor(editor);
          }}
          onUpdate={({ editor }) => {
            setValue?.(editor.getJSON());
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>

          <GenerativeMenuSwitch open={openAI} onOpenChange={setOpenAI}>
            <Separator orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Separator orientation="vertical" />

            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Separator orientation="vertical" />
            <TextButtons />
            <Separator orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </GenerativeMenuSwitch>
        </EditorContent>
      </EditorRoot>
    </div>
  );
};

export default AdvancedEditor;
