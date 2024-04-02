import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
import { useAppearance } from "@/hooks/useAppearance";
import { Session, createSession } from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import Login from "./login";
import { useEffect, useState } from "react";
import { User } from "@/backend";
import { useBackend } from "@/hooks/useBackend";

const MyApp: AppType = ({ Component, pageProps }) => {
  const appearance = useAppearance();

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

  if (!session && !isLoadingSession) {
    return (
      <Theme appearance={appearance} accentColor="orange">
        <div className="w-screen h-screen">
          <Login />
        </div>
      </Theme>
    );
  }

  return (
    <Theme appearance={appearance} accentColor="orange">
      <div className="w-screen h-screen">
        <Component {...pageProps} />
      </div>
    </Theme>
  );
};

export default MyApp;
