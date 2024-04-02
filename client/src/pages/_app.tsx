import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
import { useAppearance } from "@/hooks/useAppearance";
import { Session, SessionContext, createSession } from "@/hooks/useCurrentUser";
import Login from "./login";
import { PropsWithChildren, useEffect, useState } from "react";
import { useBackend } from "@/hooks/useBackend";
import { CenteredLoading } from "@/components/loading";

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

const MyApp: AppType = ({ Component, pageProps }) => {
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

  return (
    <AppWrapper session={session}>
      <Component {...pageProps} />
    </AppWrapper>
  );
};

export default MyApp;
