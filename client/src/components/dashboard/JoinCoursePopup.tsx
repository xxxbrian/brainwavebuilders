import React, { useState, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Button, Dialog } from "@radix-ui/themes";
import { useBackend } from "@/hooks/useBackend";
import { useRouter } from "next/navigation";

export const JoinCourseButton: React.FC = () => {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [isInvalid, setIsInvalid] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setIsInvalid(false);
    const { value } = event.target;
    const newCode = [...code];

    // Set fucused input value
    newCode[index] = value;
    setCode(newCode);

    // If the current input box has a value and is not the last input box, jump to the next input box
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    // If input 6 numbers, submit code
    if (index === 5 && newCode.every((digit) => digit !== "")) {
      void handleSubmit(newCode.join(""));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    // enable delete to jump to previous input box
    if (event.key === "Backspace" && !code[index] && index > 0) {
      // delete the value in previous input box
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      // move focus on next input box
      inputsRef.current[index - 1]?.focus();
    }
  };

  const backend = useBackend();
  const router = useRouter();

  const handleSubmit = async (finalCode: string) => {
    console.log("Submitted code:", finalCode);
    try {
      const { course } = await backend.joinCourse({ code: finalCode });
      console.log("Joined course:", course);
      router.push(`/course/${course.id}`);
    } catch {
      setIsInvalid(true);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="surface" size={"3"}>
          Join Course
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title className="flex justify-between items-start">
          <span className="font-bold text-[40px] leading-[48px] tracking-normal text-blue-500">
            Invitation Code
          </span>
          {/* Close Button */}
          <Dialog.Close>
            <button>×</button>
          </Dialog.Close>
        </Dialog.Title>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            void handleSubmit(code.join(""));
          }}
          className="mt-4"
        >
          <p>Ask your teacher for the class code, then enter it here.</p>
          <div className="flex items-center space-x-2 my-4">
            {code.map((value, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="border-2 border-gray-300 focus:border-blue-600 rounded-xl text-lg text-center focus:outline-none w-[57px] h-[91px]"
                placeholder=""
                value={code[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
              />
            ))}
          </div>
        </form>
        <p
          className={`text-sm mt-2 ${
            isInvalid ? "text-red-500" : "text-transparent"
          }`}
        >
          *Invalid code, please try again.
        </p>
        <p className="font-bold mt-4">To sign in with a class code:</p>
        <ul className="list-disc pl-5 mb-4">
          <li>Use an authorized account</li>
          <li>Use a class code with 6 letters or numbers</li>
        </ul>
        <p>
          {/* //TODO Please modify below link to real help center */}
          If you have trouble joining the class, go to the{" "}
          <a href="/help" className="text-blue-600 underline">
            Help Center article
          </a>
          .
        </p>
      </Dialog.Content>
    </Dialog.Root>
  );
};
