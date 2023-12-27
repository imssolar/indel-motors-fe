import { useReducer } from "react";
import api from "../../api";
import {
  RequestWO,
  ResponseWO,
  SparesWithoutStock,
} from "../../types/workorder";
import { WorkOrderReducer } from "./WorkOrderReducer";
import { WorkOrderContext } from "./WorkOrderContext";
import { orderGroupResponse } from "../../types/orderGroup";
import { Spare, SpareFiltered } from "../../types/spare";
import { Message } from "../../types/message";

interface stateProps {
  children: React.ReactNode;
}

export interface state {
  workorder: ResponseWO | null
  workorders: ResponseWO[] | []
  message: Message
  clientNames: string | null
  ordersType: orderGroupResponse[] | []
  sparesToWorkOrder: Spare[] | []
  sparesFiltered: SpareFiltered[] | []
  sparesOutStock: SparesWithoutStock[] | []
}

const INITIAL_STATE: state = {
  workorder: null,
  workorders: [],
  message: {},
  clientNames: null,
  ordersType: [],
  sparesToWorkOrder: [],
  sparesFiltered: [],
  sparesOutStock: [],
};

export const WorkOrderState = ({ children }: stateProps) => {
  const [state, dispatch] = useReducer(WorkOrderReducer,INITIAL_STATE)

  const getClientNames = async (license_plate: string): Promise<void> => {
    try {
      const {
        data: {
          vehicle: { client },
        },
      } = await api.get(`/vehicle/${license_plate}`);
      const { names, surnames } = client;
      dispatch({
        type: "GET_CLIENTNAMES",
        payload: `${names} ${surnames}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getWorkOrderType = async (): Promise<void> => {
    try {
      const { data } = await api.get(`ordergroup`);
      dispatch({
        type: "GET_ORDERSTYPE",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSparesToWorkOrder = async (): Promise<void> => {
    try {
      const { data } = await api.get(`spare`);
      dispatch({
        type: "GET_SPARESTOWORK",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addNewWorkOrder = async (newWorkOrder: RequestWO) => {
    try {
      const { data } = await api.post(`/workorder`, newWorkOrder);
      const { message, type, sparesWithoutStock } = data;
      console.log(message);
      console.log(type);
      console.log(sparesWithoutStock);

      dispatch({
        type: "ADD_WORKORDER",
      });
      messageToShow({ text: message, type });
    } catch (error: any) {
      const { message, type } = error.response.data;
      console.log(error.response.data);
      setSparesWithoutStock(error.response.data.sparesWithoutStock);
      messageToShow({ text: message, type });
      return;
    }
  };

  const filterSparesToWorkOrder = (sparesIDs: number[]) => {
    dispatch({
      type: "FILTER_SPARESTOWORK",
      payload: sparesIDs,
    });
  };

  const cleanClientNames = () => {
    dispatch({
      type: "CLEAN_CLIENTNAMES",
    });
  };

  const messageToShow = (message: Message): void => {
    console.log(message);
    dispatch({
      type: "MESSAGE_WORKORDER",
      payload: message,
    });
  };

  const setSparesWithoutStock = (sparesOut: SparesWithoutStock[]) => {
    dispatch({
      type: "SET_SPARESWITHOUTSTOCK",
      payload: sparesOut,
    });
  };

  const cleanSearchData = () => {
    dispatch({
      type: "CLEAN_SEARCH",
    });
  };

  const cleanMessage =()=>{
    dispatch({
      type:"CLEAN_MESSAGE"
    })
  }

  return (
    <WorkOrderContext.Provider
      value={{
        ...state,
        getClientNames,
        getWorkOrderType,
        addNewWorkOrder,
        getSparesToWorkOrder,
        filterSparesToWorkOrder,
        cleanClientNames,
        messageToShow,
        cleanSearchData,
        cleanMessage
      }}
    >
      {children}
    </WorkOrderContext.Provider>
  );
};
