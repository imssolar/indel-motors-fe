import { useReducer } from "react";
import { Spare } from "../../types/spare";
import { spareReducer } from "./spareReducer";
import { SpareContext } from "./spareContext";

interface spareProps {
  children: React.ReactNode;
}

export interface ISpareState {
  spare: Spare | null;
}

export const INITIAL_STATE: ISpareState = {
  spare: null,
};

export const spareState = ({ children }: spareProps) => {
  const [state, dispatch] = useReducer(spareReducer, INITIAL_STATE);

  const getSpare = async (spareID: string) => {
    try {
    } catch (error) {}
  };

  return (
    <SpareContext.Provider
      value={{
        ...state,
        getSpare,
      }}
    >
      {children}
    </SpareContext.Provider>
  );
};
