import { Client } from "../../types/client";
import { state } from "./ClientState";

type ClientActionType =
  | { type: "ADD_CLIENT" }
  | { type: "GET_CLIENTS"; payload: Client[] }
  | { type: "EDIT_CLIENT"; payload: string }
  | { type: "FIND_CLIENT"; payload: Client }
  | { type: "CLEAR_CLIENT" };

export const ClientReducer = (state: state, action: ClientActionType) => {
  switch (action.type) {
    case "GET_CLIENTS":
      return {
        ...state,
        clients: action.payload,
      };

    case "ADD_CLIENT":
      return {
        ...state,
        // client: action.payload,
      };

    case "EDIT_CLIENT":
      return {
        ...state,
        message: action.payload,
      };

    case "FIND_CLIENT":
      return {
        ...state,
        client: action.payload,
      };

    case "CLEAR_CLIENT":
      return {
        ...state,
        client: null,
      };

    default:
      return state;
  }
};
