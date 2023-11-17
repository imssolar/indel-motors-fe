import { createContext } from "react";
import { Message } from "../../types/message";
import { Unit, UnitToCreate } from "../../types/unit";

interface ContextProps {
  unit: Unit | null;
  getUnits: () => Promise<void>;
  addUnit: (unit: UnitToCreate) => Promise<void>;
  editUnit: (unit: UnitToCreate) => Promise<void>;
  findUnit: (unitName: string) => Promise<void>;
  deleteUnit: (unitName: string) => Promise<void>;
  messageToShow: (message: Message) => void;
}

export const UnitContext = createContext({} as ContextProps);