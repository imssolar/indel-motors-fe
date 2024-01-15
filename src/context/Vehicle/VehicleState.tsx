import { useReducer } from "react";
import { VehicleReducer } from "./VehicleReducer";
import { VehicleContext } from "./VehicleContext";
import { Vehicle, vehicleResponse } from "../../types/vehicle";
import api from "../../api";
import { Message } from "../../types/message";
import { Brand } from "../../types/brand";
interface stateProps {
  children: React.ReactNode;
}

export interface state {
  vehicle: vehicleResponse | null;
  message: Message;
  brands: Brand[];
}

const INITIAL_STATE: state = {
  vehicle: null,
  message: {},
  brands: [],
};

export const VehicleState = ({ children }: stateProps) => {
  const [state, dispatch] = useReducer(VehicleReducer, INITIAL_STATE);

  const getVehicles = async () => {
    try {
      const { data } = await api.get("/vehicle");
    } catch (error) {
      console.log(error);
    }
  };

  const addVehicle = async (vehicleToCreate: Vehicle) => {
    console.log(vehicleToCreate);
    try {
      const { data } = await api.post("/vehicle", vehicleToCreate);
      dispatch({
        type: "ADD_VEHICLE",
      });
      messageToShow({ text: data.message, type: data.type });
    } catch (error: any) {
      const { message, type } = error.response.data;
      messageToShow({ text: message, type });
      return;
    }
  };

  const getVehicle = async (license: string) => {
    try {
      const { data } = await api.get(`/vehicle/${license}`);
      dispatch({
        type: "GET_VEHICLE",
        payload: data.vehicle,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateVehicle = async (vehicleToUpdate: Vehicle) => {
    try {
      await api.put(
        `/vehicle/${vehicleToUpdate.license_plate}`,
        vehicleToUpdate
      );
      dispatch({
        type: "UPDATE_VEHICLE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVehicle = async (licence: string) => {
    try {
      await api.delete(`/vehicle/${licence}`);
      dispatch({
        type: "DELETE_VEHICLE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const clearVehicleFinder = async (): Promise<void> => {
    dispatch({
      type: "CLEAR_VEHICLE",
    });
  };

  const getBrands = async (): Promise<void> => {
    try {
      const { data } = await api.get("/brand");
      dispatch({
        type: "GET_BRANDS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const messageToShow = (message: Message): void => {
    dispatch({
      type: "MESSAGE_VEHICLE",
      payload: message,
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
        getBrands,
        messageToShow,
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};
