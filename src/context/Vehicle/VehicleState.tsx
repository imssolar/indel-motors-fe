import { useReducer } from "react";
import { VehicleReducer } from "./VehicleReducer";
import { VehicleContext } from "./VehicleContext";
import { Vehicle, vehicleResponse } from "../../types/vehicle";
import api from "../../api";
import { Message } from "../../types/message";
interface stateProps {
  children: React.ReactNode;
}

export interface state {
  vehicle: vehicleResponse | null;
  message: Message;
}

const INITIAL_STATE: state = {
  vehicle: null,
  message: {},
};

export const VehicleState = ({ children }: stateProps) => {
  const [state, dispatch] = useReducer(VehicleReducer, INITIAL_STATE);

  const getVehicles = async () => {
    try {
      const { data } = await api.get("/vehicles");
    } catch (error) {
      console.log(error);
    }
  };

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

  const getVehicle = async (license: string) => {
    try {
      const { data } = await api.get(`/vehicle/${license}`);
      dispatch({
        type: "GET_VEHICLE",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateVehicle = async (licence: string) => {};

  const deleteVehicle = async (licence: string) => {};

  const clearVehicleFinder = async () => {
    dispatch({
      type: "CLEAR_VEHICLE",
      payload
    });
  };

  return (
    <VehicleContext.Provider
      value={{
        ...state,
        addVehicle,
        getVehicles,
        getVehicle,
        updateVehicle,
        deleteVehicle,
        clearVehicleFinder,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
