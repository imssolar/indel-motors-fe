import { useReducer } from "react";
import { VehicleReducer } from "./VehicleReducer";
import { VehicleContext } from "./VehicleContext";
import { Vehicle } from "../../types/vehicle";
import api from "../../api";
interface stateProps {
  children: React.ReactNode;
}

export interface state {}

const INITIAL_STATE: state = {};

export const VehicleState = ({ children }: stateProps) => {
  const [state, dispatch] = useReducer(VehicleReducer, INITIAL_STATE);

  const addVehicle = async (vehicleToCreate: Vehicle) => {
    try {
      await api.post("/vehicle", vehicleToCreate);
      dispatch({
        type: "ADD_VEHICLE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VehicleContext.Provider
      value={{
        ...state,
        addVehicle,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
