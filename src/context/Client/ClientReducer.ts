import { Client } from "../../types/client";
import { Message } from "../../types/message";
import { state } from "./ClientState";

type ClientActionType =
  | { type: "ADD_CLIENT" }
  | { type: "GET_CLIENTS"; payload: Client[] }
  | { type: "EDIT_CLIENT"; payload: Message }
  | { type: "FIND_CLIENT"; payload: Client }
  | { type: "CLEAR_CLIENT" }
  | { type: "MESSAGE_CLIENT"; payload: Message }
  | { type: "DELETE_CLIENT" };

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
      };

    case "EDIT_CLIENT":
      return {
        ...state,
        message: { text: action.payload.text, type: action.payload.type },
      };

    case "FIND_CLIENT":
      return {
        ...state,
        client: action.payload,
        message: {},
      };

    case "CLEAR_CLIENT":
      return {
        ...state,
        client: null,
        message: {},
      };

    case "MESSAGE_CLIENT":
      return {
        ...state,
        message: { text: action.payload.text, type: action.payload.type },
        client: null,
      };

    case "DELETE_CLIENT":
      return {
        ...state,
        // message:action.payload
      };

    default:
      return state;
  }
};
