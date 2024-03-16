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
  spareGroups: spareGroup[] | [];
  message: Message;
}

const INITIAL_STATE: ISpareGroup = {
  spareGroup: null,
  spareGroups: [],
  message: {},
};

export const SpareGroupState = ({ children }: spareGroupProps) => {
  const [state, dispatch] = useReducer(SpareGroupReducer, INITIAL_STATE);

  const getSpareGroups = async () => {
    try {
      const { data } = await api.get("/spareGroup");
      dispatch({
        type: "GET_SPAREGROUPS",
        payload: data,
      });
    } catch (error) {}
  };

  const addSpareGroup = async (spareGroup: newSpareGroup): Promise<void> => {
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
  const getSpareGroup = async (name: string): Promise<void> => {
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

  const clearSpareGroup = (): void => {
    dispatch({
      type: "CLEAR_SPAREGROUP",
    });
  };

  const editSpareGroup = async (
    spareGroupEdit: newSpareGroup
  ): Promise<void> => {
    try {
      const { data } = await api.put(
        `/spareGroup/${spareGroupEdit.name}`,
        spareGroupEdit
      );
      const { message, type } = data;
      messageToShow({ text: message, type });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSpareGroup = async (name: string): Promise<void> => {
    try {
      const { data } = await api.delete(`spareGroup/${name}`);
      const { message, type } = data;
      messageToShow({ text: message, type });
    } catch (error) {
      console.log(error);
    }
  };

  const messageToShow = (message: Message): void => {
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
		getSpareGroups,
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
