import React, { PropsWithChildren, createContext, useCallback } from "react";
import { TopNav } from "./TopNav";
import SideNav from "./SideNav";

// export interface PageFrameState {}
// export interface PageFrameActions {}

// export type PageFrameService = [PageFrameState, PageFrameActions];

// export const PageFrameContext = createContext<PageFrameService | null>(null);

// export const usePageFrame = (): PageFrameService => {
//   const context = React.useContext(PageFrameContext);

//   if (context === null) {
//     throw new Error("usePageFrame must be used within a PageFrameProvider");
//   }

//   return context;
// };

interface Props extends PropsWithChildren {
  title: string;
  className?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const PageFrame: React.FC<Props> = ({
  children,
  title,
  className,
  left,
  right,
}) => {
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(false);

  const toggleSideNav = useCallback(() => {
    setIsSideNavOpen((prev) => !prev);
  }, []);

  return (
    <div className={`${className ?? ""}`}>
      <div className="flex flex-col relative flex-1">
        <TopNav
          title={title}
          onClickMenu={toggleSideNav}
          isSideMenuActive={isSideNavOpen}
          left={left}
          right={right}
          className="z-10"
        />
        <div className="flex space-x-4">
          <SideNav isOpen={isSideNavOpen} displayType=""></SideNav>
          <div className="px-4 flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
};
