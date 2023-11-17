import { createContext } from "react";
import { Vehicle, vehicleResponse } from "../../types/vehicle";
import { Message } from "../../types/message";
import { Brand } from "../../types/brand";

interface ContextProps {
  vehicle: vehicleResponse | null;
  message: Message;
  brands:Brand[] 
  addVehicle: (vehicleToCreate: Vehicle) => Promise<void>;
  getVehicle: (license: string) => Promise<void>;
  getVehicles: () => Promise<void>;
  updateVehicle: (license: string) => Promise<void>;
  deleteVehicle: (license: string) => Promise<void>;
  clearVehicleFinder: () => void;
  getBrands: () => Promise<void>;
}

export const VehicleContext = createContext({} as ContextProps);
