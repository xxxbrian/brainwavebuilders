import { BrainwavesClient, User } from "@/backend";
import Cookies from "js-cookie";
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
  const token = Cookies.get("token");

  if (!token) {
    return null;
  }

  try {
    // TODO: remove the requirement for providing the token.
    const { user } = await backend.getUserInfo({ token });

    return { user, token };
  } catch {
    Cookies.remove("token");
    return null;
  }
};
