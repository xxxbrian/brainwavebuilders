import React from "react";

import MainDashboard from "./dashboard";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Login from "./login";

export default function Home() {
  const user = useCurrentUser();

  if (!user) {
    return <Login />;
  }

  return <MainDashboard />;
}
