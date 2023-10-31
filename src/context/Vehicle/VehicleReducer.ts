import { state } from "./VehicleState";

type vehicleActionType = { type: "ADD_VEHICLE" };

export const VehicleReducer = (state: state, action: vehicleActionType) => {
  switch (action.type) {
    case "ADD_VEHICLE":
      return {
        ...state,
      };
    default:
      return state;
  }
};
