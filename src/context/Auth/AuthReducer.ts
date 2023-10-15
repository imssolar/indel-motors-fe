import { User } from "../../types/user";
import { state } from "./AuthState";

type AuthActionType =
  | { type: "LOGIN"; payload: { user: User; token: string } }
  | { type: "REGISTER"; payload: { userToRegister: User } }
  | { type: "LOGOUT" };

export const AuthReducer = (state: state, action: AuthActionType) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    default:
      return state;
  }
};
