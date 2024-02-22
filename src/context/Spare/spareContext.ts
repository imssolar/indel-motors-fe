import { createContext } from "react";
import { Spare } from "../../types/spare";
import { RequestArraySpare } from "../../types/workorder";

interface ContextProps {
  spare: Spare | null;
  allSpares: Spare[] | [];
  requestSpares: RequestArraySpare[] | [];
  setRequestSpares: (spareSelected: string, id: number) => void;
  AddnewArrayOfSpare: (spareToAdd: RequestArraySpare) => void;
  deleteSpare: (index: number) => void;
  handleQuantity: (requestQuantity: number, index: number) => void;
  getSpare: (spareID: string) => Promise<void>;
  getSpares: () => Promise<void>;
  setRequestSpareEdit: (requestSparesEdit: any, spares_stock: any) => void;
}

export const SpareContext = createContext({} as ContextProps);
