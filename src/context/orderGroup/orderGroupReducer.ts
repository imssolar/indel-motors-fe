import { orderGroupResponse } from "../../types/orderGroup";
import { state } from "./OrderGroupState";

type orderGroupActions =
  | { type: "GET_ORDERGROUPS"; payload: orderGroupResponse[] }
  | { type: "GET_ORDERGROUP"; payload: orderGroupResponse }
  | { type: "ADD_ORDERGROUP" };

export const OrderGroupReducer = (
  state: state,
  action: orderGroupActions
): state => {
  switch (action.type) {
    case "GET_ORDERGROUPS":
      return {
        ...state,
        orderGroup:action.payload
      };
    case "GET_ORDERGROUP":
      return {
        ...state,
        // orderGroup: action.payload,
      };

    case "ADD_ORDERGROUP":
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
};
