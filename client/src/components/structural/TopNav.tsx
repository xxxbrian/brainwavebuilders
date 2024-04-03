import React, { PropsWithChildren, useCallback } from "react";
import { Logo } from "../Logo";
import { AiOutlineMenu } from "react-icons/ai";
import { User } from "@/backend";
import { RxAvatar } from "react-icons/rx";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

interface Props extends PropsWithChildren {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  onClickMenu?: () => void;
  isSideMenuActive?: boolean;
  className?: string;
}

const UserDisplay: React.FC<{ user: User }> = ({ user }) => {
  const router = useRouter();
  const onClickUserAvator = useCallback(() => {
    router.push("/profile");
  }, [router]);

  return (
    <div onClick={onClickUserAvator}>
      {user.avatar ? (
        <img
          src={user.avatar}
          alt="avatar"
          className="h-12 w-12 rounded-full"
        />
      ) : (
        <RxAvatar className="h-12 w-12 text-zinc-500 ml-2 mr-2" />
      )}
    </div>
  );
};

export const TopNav = ({
  title,
  left,
  right,
  onClickMenu,
  isSideMenuActive,
  className,
}: Props) => {
  const user = useCurrentUser();

  return (
    <div
      className={`border-b py-4 text-center left-0 top-0 w-full backdrop-blur-md bg-white bg-opacity-80 flex px-4 items-center ${className}`}
    >
      <div className="w-1/4 flex space-x-4 items-center px-4">
        <div className="space-x-6 flex items-center">
          {onClickMenu && (
            <div
              className={`p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 cursor-pointer select-none ${
                isSideMenuActive ? "bg-gray-100" : ""
              }`}
              onClick={onClickMenu}
            >
              <AiOutlineMenu className="text-2xl" stroke="2" />
            </div>
          )}
          <Logo size="xs"></Logo>
        </div>
        {left}
      </div>
      <div className="font-bold flex-1">{title}</div>
      <div className="w-1/4 flex space-x-4 justify-end">
        {right}
        <div className="flex-shrink-0">
          {user ? (
            <UserDisplay user={user} />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-300">Log in</div>
          )}
        </div>
      </div>
    </div>
  );
};
