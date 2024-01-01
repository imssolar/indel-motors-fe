import { createContext } from "react";
import { Spare } from "../../types/spare";

interface ContextProps {
  spare: Spare | null;
  allSpares: Spare[] | [];
  getSpare: (spareID: string) => Promise<void>;
  getSpares: () => Promise<void>;
}

export const SpareContext = createContext({} as ContextProps);
