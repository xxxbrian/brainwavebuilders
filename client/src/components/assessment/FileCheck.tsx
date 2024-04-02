import React, { useState } from "react";
import type { ChangeEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { studentResults } from "./AssessmentResults";

const FileCheck: React.FC<studentResults> = ({ res, assessmentName }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <a className="text-blue-400 hover:text-blue-100 text-sm hover:cursor-pointer">
          File
        </a>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 bg-white p-6 rounded-3xl shadow-lg"
          style={{
            width: "700px",
            height: "218px",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Dialog.Title className="flex justify-between items-start font-sans">
            <span className="font-bold text-[40px] leading-[48px] tracking-normal text-blue-500 ml-2">
              {"File Submitted by " + res.name}
            </span>
            {/* Close Button */}
            <Dialog.Close asChild>
              <button
                className="text-orange-500 hover:text-orange-600 transform hover:scale-110 text-2xl"
                style={{ transition: "transform 0.2s" }}
              >
                ×
              </button>
            </Dialog.Close>
          </Dialog.Title>
          <div className="flex flex-col m-2 ml-6 mt-4 w-full">
            <span className="text-2xl text-black">{assessmentName}</span>
            <a
              className="mt-2 block text-2xl text-blue-600 hover:cursor-pointer hover:text-blue-100"
              href={res.file}
              download
            >
              {"File: " + res.file}
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default FileCheck;
