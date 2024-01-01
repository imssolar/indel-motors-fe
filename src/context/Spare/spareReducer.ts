import { Spare } from "../../types/spare";
import { ISpareState } from "./spareState";

type spareActionType =
  | { type: "GET_SPARE"; payload: Spare }
  | { type: "GET_ALLSPARES"; payload: Spare[] };

export const SpareReducer = (state: ISpareState, action: spareActionType) => {
  switch (action.type) {
    case "GET_SPARE":
      return {
        ...state,
        spare: action.payload,
      };

    case "GET_ALLSPARES":
      return {
        ...state,
        allSpares: action.payload,
      };

    default:
      return state;
  }
};
