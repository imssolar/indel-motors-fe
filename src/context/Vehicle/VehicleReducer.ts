import { Brand } from "../../types/brand";
import { Message } from "../../types/message";
import { vehicleResponse } from "../../types/vehicle";
import { state } from "./VehicleState";

type VehicleActionType =
  | { type: "ADD_VEHICLE" }
  | { type: "GET_VEHICLE"; payload: vehicleResponse }
  | { type: "CLEAR_VEHICLE" }
  | { type: "GET_BRANDS"; payload: Brand[] }
  | { type: "UPDATE_VEHICLE" }
  | { type: "DELETE_VEHICLE" }
  | { type: "MESSAGE_VEHICLE"; payload: Message };

export const VehicleReducer = (state: state, action: VehicleActionType) => {
  switch (action.type) {
    case "ADD_VEHICLE":
    case "UPDATE_VEHICLE":
    case "DELETE_VEHICLE":
      return {
        ...state,
      };

    case "GET_VEHICLE":
      return {
        ...state,
        vehicle: action.payload,
      };

    case "CLEAR_VEHICLE":
      return {
        ...state,
        vehicle: null,
        message: {},
      };

    case "GET_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };

    case "MESSAGE_VEHICLE":
      return {
        ...state,
        message: { text: action.payload.text, type: action.payload.type },
      };

    default:
      return state;
  }
};
