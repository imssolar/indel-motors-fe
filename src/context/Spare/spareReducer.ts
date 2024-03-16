
import { RequestArraySpare , Spare} from "../../types/spare";
import { ISpareState } from "./spareState";

type spareActionType =
  | { type: "GET_SPARE"; payload: Spare }
  | { type: "GET_ALLSPARES"; payload: Spare[] }
  | { type: "SET_REQUESTSPARE"; payload: { id: number; spareSelected: Spare | null} }
  | { type: "ADD_NEWSPARE"; payload: RequestArraySpare }
  | { type: "DELETE_REQUESTSPARE"; payload: number }
  | {
      type: "SET_QUANTITY";
      payload: { requestQuantity: number; index: number };
    }
  | {type :"SET_REQUESTSPARE_EDIT",payload:any}

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

    case "SET_REQUESTSPARE":
      return {
        ...state,
        requestSpares: state.requestSpares.map((item, index) => {
          if (index === action.payload.id) {
            return {
              ...item,
              code: action.payload.spareSelected?.code_id ?? "",
              stock: action.payload.spareSelected?.stock ?? 0,
              name: action.payload.spareSelected?.name ?? "",
              value: action.payload.spareSelected?.cost ?? 0,
            };
          }
          return item;
        }),
      };

    case "ADD_NEWSPARE":
      return {
        ...state,
        requestSpares: [...state.requestSpares, action.payload],
      };

    case "DELETE_REQUESTSPARE":
      return {
        ...state,
        requestSpares: state.requestSpares.filter(
          ( item ,index) => index !== action.payload
        ),
      };

    case "SET_QUANTITY":
      return {
        ...state,
        requestSpares: state.requestSpares.map((item, i) => {
          const { index, requestQuantity } = action.payload;
          if (i === index) {
            return {
              ...item,
              quantity: requestQuantity > item.stock ? 0 : requestQuantity,
              total: requestQuantity * item.value,
            };
          }
          return item;
        }),
      };

    case "SET_REQUESTSPARE_EDIT":
      return {
        ...state,
        requestSpares:action.payload
      }
    default:
      return state;
  }
};
