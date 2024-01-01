import { useReducer } from "react";
import { Spare } from "../../types/spare";
import { SpareReducer } from "./spareReducer";
import { SpareContext } from "./SpareContext";
import api from "../../api";
interface spareProps {
  children: React.ReactNode;
}

export interface ISpareState {
  spare: Spare | null;
  allSpares: Spare[] | [];
}

export const INITIAL_STATE: ISpareState = {
  spare: null,
  allSpares: [],
};

export const SpareState = ({ children }: spareProps) => {
  const [state, dispatch] = useReducer(SpareReducer, INITIAL_STATE);

  const getSpare = async (spareID: string) => {
    try {
      const { data } = await api.get(`/spare/${spareID}`);
      dispatch({
        type: "GET_SPARE",
        payload: data,
      });
    } catch (error) {}
  };

  const getSpares = async () => {
    try {
      const { data } = await api.get("/spare");
      dispatch({
        type: "GET_ALLSPARES",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SpareContext.Provider
      value={{
        ...state,
        getSpare,
        getSpares
      }}
    >
      {children}
    </SpareContext.Provider>
  );
};
