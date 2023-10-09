import { createContext } from "react";
import {  User, UserLogin } from "../../types";

interface ContextProps {
  token: string;
  user: User | null;
  login: (userToLogin: UserLogin) => Promise<void>;
  logout: () => void;
  getToken: () => Promise<void>;
}

export const AuthContext = createContext({} as ContextProps);
