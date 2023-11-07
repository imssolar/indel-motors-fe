import { createContext } from "react";
import { Spare } from "../../types/spare";

interface ContextProps {
  spare: Spare | null;
  getSpare: (spareID: string) => Promise<void>;
}

export const SpareContext = createContext({} as ContextProps);
