import { createContext } from "react";
import { Vehicle, vehicleResponse } from "../../types/vehicle";
import { Message } from "../../types/message";

interface ContextProps {
  vehicle: vehicleResponse | null;
  message: Message;
  addVehicle: (vehicleToCreate: Vehicle) => Promise<void>;
  getVehicle: (license: string) => Promise<void>;
  getVehicles: () => Promise<void>;
  updateVehicle: (license: string) => Promise<void>;
  deleteVehicle: (license: string) => Promise<void>;
  clearVehicleFinder: () => void;
}

export const VehicleContext = createContext({} as ContextProps);
