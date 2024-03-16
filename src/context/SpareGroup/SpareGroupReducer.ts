import { spareGroup } from "../../types/spareGroup";
import { ISpareGroup } from "./SpareGroupState";
import { Message } from "../../types/message";

type spareGroupActions =
  | { type: "GET_SPAREGROUP"; payload: spareGroup }
  | { type: "ADD_SPAREGROUP" }
  | { type: "MESSAGE_SPAREGROUP"; payload: Message }
  | { type: "CLEAR_SPAREGROUP" }
  | { type: "GET_SPAREGROUPS"; payload: spareGroup[] };

export const SpareGroupReducer = (
  state: ISpareGroup,
  action: spareGroupActions
) => {
  switch (action.type) {
    case "GET_SPAREGROUP":
      return {
        ...state,
        spareGroup: action.payload,
      };

    case "GET_SPAREGROUPS":
      return {
        ...state,
        spareGroups: action.payload,
      };

    case "ADD_SPAREGROUP":
      return {
        ...state,
      };

    case "MESSAGE_SPAREGROUP":
      return {
        ...state,
        message: { text: action.payload.text, type: action.payload.type },
      };

    case "CLEAR_SPAREGROUP":
      return {
        ...state,
        message: {},
        spareGroup: null,
      };

    default:
      return state;
  }
};
