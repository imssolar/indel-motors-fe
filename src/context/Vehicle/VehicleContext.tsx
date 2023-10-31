import { createContext } from "react";
import { Vehicle } from "../../types/vehicle";

interface ContextProps {
  addVehicle: (vehicleToCreate: Vehicle) => Promise<void>;
}

export const VehicleContext = createContext({} as ContextProps);
