import { createContext } from "react";
import { User, UserLogin } from "../../types/user";
import { Message } from "../../types/message";

interface ContextProps {
  token: string;
  user: User | null;
  messageAuth: Message;
  login: (userToLogin: UserLogin) => Promise<void>;
  logout: () => void;
  getToken: () => Promise<void>;
  cleanMessage: () => void;
}

export const AuthContext = createContext({} as ContextProps);
