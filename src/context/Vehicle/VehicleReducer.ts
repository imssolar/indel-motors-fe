import { vehicleResponse } from "../../types/vehicle";
import { state } from "./VehicleState";

type vehicleActionType =
  | { type: "ADD_VEHICLE" }
  | { type: "GET_VEHICLE"; payload: vehicleResponse }
  | { type: "CLEAR_VEHICLE" };

export const VehicleReducer = (state: state, action: vehicleActionType) => {
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

    default:
      return state;
  }
};
