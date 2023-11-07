import { Spare } from "../../types/spare";
import { ISpareState } from "./spareState";

type spareActionType = { type: "GET_SPARE"; payload: Spare };

export const spareReducer = (state: ISpareState, action: spareActionType) => {
  switch (action.type) {
    case "GET_SPARE":
      return {
        ...state,
        spare: action.payload,
      };

    default:
      return state;
  }
};
