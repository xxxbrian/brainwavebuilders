"use client";

import { Theme } from "@radix-ui/themes";
import { useAppearance } from "@/hooks/useAppearance";
import { Session, SessionContext, createSession } from "@/hooks/useCurrentUser";
// import Login from "./login";
import { PropsWithChildren, useEffect, useState } from "react";
import { useBackend } from "@/hooks/useBackend";
import { CenteredLoading } from "@/components/loading";
import Login from "@/app/login/page";

interface WrapperProps extends PropsWithChildren {
  session: Session | null;
}

const AppWrapper: React.FC<WrapperProps> = ({ children, session }) => {
  const appearance = useAppearance();

  return (
    <SessionContext.Provider value={session}>
      <Theme appearance={appearance} accentColor="orange">
        <div className="w-screen h-screen">{children}</div>
      </Theme>
    </SessionContext.Provider>
  );
};

const AppInner: React.FC<PropsWithChildren> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  const backend = useBackend();

  useEffect(() => {
    setIsLoadingSession(true);

    const inner = async () => {
      const session = await createSession(backend);
      setSession(session);
      setIsLoadingSession(false);
    };

    void inner();
  }, [backend]);

  if (isLoadingSession) {
    return (
      <AppWrapper session={session}>
        <CenteredLoading />
      </AppWrapper>
    );
  }

  if (!session && !isLoadingSession) {
    return (
      <AppWrapper session={session}>
        <Login />
      </AppWrapper>
    );
  }

  return <AppWrapper session={session}>{children}</AppWrapper>;
};

export default AppInner;
