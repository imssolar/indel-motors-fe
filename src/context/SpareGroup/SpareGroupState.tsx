import { useReducer } from "react";
import { newSpareGroup, spareGroup } from "../../types/spareGroup";

import { spareGroupContext } from "./spareGroupContext";
import api from "../../api";
import { Message } from "../../types/message";
import { SpareGroupReducer } from "./SpareGroupReducer";

interface spareGroupProps {
  children: React.ReactNode;
}

export interface ISpareGroup {
  spareGroup: spareGroup | null;
  message: Message;
}

const INITIAL_STATE: ISpareGroup = {
  spareGroup: null,
  message: {},
};

export const SpareGroupState = ({ children }: spareGroupProps) => {
  const [state, dispatch] = useReducer(SpareGroupReducer, INITIAL_STATE);

  const addSpareGroup = async (spareGroup: newSpareGroup) => {
    try {
      const { data } = await api.post("/spareGroup", spareGroup);
      console.log(data);
      dispatch({
        type: "ADD_SPAREGROUP",
      });
      messageToShow({ text: data.message, type: data.type });
    } catch (error: any) {
      const { message, type } = error.response.data;
      messageToShow({ text: message, type });
    }
  };
  const getSpareGroup = async (name: string) => {
    try {
      const { data } = await api.get(`spareGroup/${name}`);
      dispatch({
        type: "GET_SPAREGROUP",
        payload: data,
      });
    } catch (error: any) {
      const { message, type } = error.response.data;
      messageToShow({ text: message, type });
      return;
    }
  };

  const clearSpareGroup = () => {
    dispatch({
      type: "CLEAR_SPAREGROUP",
    });
  };

  const editSpareGroup = async (spareGroupEdit: newSpareGroup) => {};

  const deleteSpareGroup = async (name: string) => {
    try {
      const { data } = await api.delete(`spareGroup/${name}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const messageToShow = (message: Message) => {
    dispatch({
      type: "MESSAGE_SPAREGROUP",
      payload: message,
    });
  };

  return (
    <spareGroupContext.Provider
      value={{
        ...state,
        addSpareGroup,
        getSpareGroup,
        editSpareGroup,
        deleteSpareGroup,
        messageToShow,
        clearSpareGroup,
      }}
    >
      {children}
    </spareGroupContext.Provider>
  );
};
