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

  const [hoverSideNav, setHoverSideNav] = React.useState(false);

  const displaySideNav = hoverSideNav || isSideNavOpen;

  const onHoverSideNav = useCallback(() => {
    setHoverSideNav(true);
  }, []);

  const onLeaveSideNav = useCallback(() => {
    setHoverSideNav(false);
  }, []);

  return (
    <div className={`${className ?? ""}`}>
      <div className="flex relative h-screen overflow-hidden">
        <SideNav
          isOpen={displaySideNav}
          className="overflow-y-auto pt-28"
          onMouseEnter={onHoverSideNav}
          onMouseLeave={onLeaveSideNav}
        />

        <div className="flex flex-col space-x-4 relative flex-1 overflow-y-auto">
          <TopNav
            title={title}
            onClickMenu={toggleSideNav}
            isSideMenuActive={isSideNavOpen}
            left={left}
            right={right}
            className="fixed left-0 right-0 z-40"
          />
          <div className="px-4 flex-1 pt-24">{children}</div>
        </div>
      </div>
    </div>
  );
};
