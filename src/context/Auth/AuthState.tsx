import React, { useEffect, useReducer } from "react";
import { User, UserLogin } from "../../types/user";
import api from "../../api";
import { AuthContext } from "./AuthContext";
import { AuthReducer } from "./AuthReducer";
import { Message } from "../../types/message";
interface stateProps {
  children: React.ReactNode;
}

export interface state {
  token: string;
  user: User | null;
  messageAuth: Message | {};
}

const INITIAL_STATE: state = {
  token: "",
  user: null,
  messageAuth: {},
};

export const AuthState = ({ children }: stateProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    getToken();
  }, []);

  const login = async (userToLogin: UserLogin) => {
    try {
      const {
        data: { token, user },
      } = await api.post("/auth/login", userToLogin);
      localStorage.setItem("token", token);
      dispatch({
        type: "LOGIN",
        payload: {
          user,
          token,
        },
      });
    } catch (error: any) {
      const { message, type } = error.response.data;
      messageToShow({ text: message, type });
      return;
    }
  };

  const messageToShow = (message: Message): void => {
    dispatch({
      type: "MESSAGE_AUTH",
      payload: message,
    });
  };

  const logout = () => {};

  const getToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch({ type: "LOGOUT" });
    const resp = await api.get("/auth", { headers: { "x-token": token } });
    if (resp.status !== 200) return dispatch({ type: "LOGOUT" });
    localStorage.setItem("token", token);
    dispatch({
      type: "LOGIN",
      payload: {
        user: resp.data.user,
        token: resp.data.token,
      },
    });
  };

  const cleanMessage = () => {
    dispatch({
      type: "CLEAN_MESSAGE",
    });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, login, getToken, logout, cleanMessage }}
    >
      {children}
    </AuthContext.Provider>
  );
};
