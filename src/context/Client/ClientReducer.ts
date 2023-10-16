import { Client } from "../../types/client";
import { state } from "./ClientState";

type ClientActionType =
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "GET_CLIENTS"; payload: Client[] };

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
        client: action.payload,
      };

    default:
      return state;
  }
};
