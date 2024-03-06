import { Message } from "../../types/message";
import { User } from "../../types/user";
import { state } from "./AuthState";

type AuthActionType =
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "REGISTER"; payload: { userToRegister: User } }
  | { type: "LOGOUT" }
  | { type: "MESSAGE_AUTH"; payload: Message }
  | { type: "CLEAN_MESSAGE" };

export const AuthReducer = (state: state, action: AuthActionType) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "MESSAGE_AUTH":
      return {
        ...state,
        messageAuth: { text: action.payload.text, type: action.payload.type },
      };

    case "CLEAN_MESSAGE":
      return {
        ...state,
        messageAuth: {},
      };

    default:
      return state;
  }
};
