import { type AppType } from "next/dist/shared/lib/utils";

import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { Theme } from "@radix-ui/themes";
import { useAppearance } from "@/hooks/useAppearance";

const MyApp: AppType = ({ Component, pageProps }) => {
  const appearance = useAppearance();

  return (
    <Theme appearance={appearance} accentColor="orange">
      <div className="w-screen h-screen overflow-y-scroll overflow-x-hidden">
        <Component {...pageProps} />
      </div>
    </Theme>
  );
};

export default MyApp;
