import { useReducer } from "react";
import { Spare } from "../../types/spare";
import { SpareReducer } from "./spareReducer";
import { SpareContext } from "./SpareContext";
import api from "../../api";
import { RequestArraySpare } from "../../types/workorder";
interface spareProps {
  children: React.ReactNode;
}

export interface ISpareState {
  spare: Spare | null;
  allSpares: Spare[] | [];
  requestSpares: RequestArraySpare[] | [];
}

export const INITIAL_STATE: ISpareState = {
  spare: null,
  allSpares: [],
  requestSpares: [
    {
      id: 0,
      stock: 0,
      quantity: 0,
      name: "",
      code: "",
      total: 0,
      value: 0,
    },
  ],
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

  const setRequestSpares = (code: string, id: number) => {
    const spareSelected = state.allSpares.find((item) => item.code_id === code);
    dispatch({
      type: "SET_REQUESTSPARE",
      payload: { id, spareSelected },
    });
  };

  const AddnewArrayOfSpare = (spareToAdd: RequestArraySpare) => {
    console.log(spareToAdd);
    dispatch({
      type: "ADD_NEWSPARE",
      payload: spareToAdd,
    });
  };

  const deleteSpare = (index: number) => {
    dispatch({
      type: "DELETE_REQUESTSPARE",
      payload: index,
    });
  };

  const handleQuantity = (requestQuantity: number, index: number) => {
    dispatch({
      type: "SET_QUANTITY",
      payload: { requestQuantity: requestQuantity, index },
    });
  };

  const setRequestSpareEdit = (requestSparesEdit: any, spares_stock: any) => {
    const requestWithStock = requestSparesEdit.map((res) => {
      const findId = spares_stock.find((item) => item.id === res.code_id);
      console.log(findId);
      return {
        ...res,
        quantity: findId.stock,
        value:res.cost,
        total:findId.stock * res.cost,
        code:res.code_id
      };
    });
    dispatch({
      type: "SET_REQUESTSPARE_EDIT",
      payload: requestWithStock,
    });
  };

  return (
    <SpareContext.Provider
      value={{
        ...state,
        getSpare,
        getSpares,
        setRequestSpares,
        AddnewArrayOfSpare,
        deleteSpare,
        handleQuantity,
        setRequestSpareEdit,
      }}
    >
      {children}
    </SpareContext.Provider>
  );
};
