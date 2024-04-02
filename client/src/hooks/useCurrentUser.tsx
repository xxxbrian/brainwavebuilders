import { BrainwavesClient, User, brainwavesAPI } from "@/backend";
import { UserData } from "@/utils/data";
import { createContext, useContext } from "react";

export interface Session {
  user: User;
  token: string;
}

export const useCurrentUser = (): User | null => {
  const session = useSession();
  if (session) {
    return session.user;
  }

  return null;
};

export const SessionContext = createContext<Session | null>(null);

export const useSession = (): Session | null => {
  return useContext(SessionContext);
};

export const createSession = async (
  backend: BrainwavesClient,
): Promise<Session | null> => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    console.log("Getting user info");
    const { user } = await backend.getUserInfo({
      token,
    });

    return { user, token };
  } catch {
    localStorage.removeItem("token");
    return null;
  }
};
