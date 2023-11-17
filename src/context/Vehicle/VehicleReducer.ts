import { Brand } from "../../types/brand";
import { vehicleResponse } from "../../types/vehicle";
import { state } from "./VehicleState";

type VehicleActionType =
  | { type: "ADD_VEHICLE" }
  | { type: "GET_VEHICLE"; payload: vehicleResponse }
  | { type: "CLEAR_VEHICLE" }
  | { type: "GET_BRANDS"; payload: Brand[] };

export const VehicleReducer = (state: state, action: VehicleActionType) => {
  switch (action.type) {
    case "ADD_VEHICLE":
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
        vehicle: {},
        message: {},
      };

    case "GET_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };

    default:
      return state;
  }
};
