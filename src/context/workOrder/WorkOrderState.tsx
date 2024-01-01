import { useReducer } from "react";
import api from "../../api";
import {
  RequestWO,
  ResponseGetClientByPPU,
  ResponseOTByPPU,
  ResponseWO,
  SparesWithoutStock,
} from "../../types/workorder";
import { WorkOrderReducer } from "./WorkOrderReducer";
import { WorkOrderContext } from "./WorkOrderContext";
import { orderGroupResponse } from "../../types/orderGroup";
import { Spare, SpareFiltered } from "../../types/spare";
import { Message } from "../../types/message";
import { Client } from "../../types/client";
import { Try } from "@mui/icons-material";

interface stateProps {
  children: React.ReactNode;
}

export interface state {
  workorder: ResponseWO | null;
  workorders: ResponseWO[] | [];
  message: Message;
  vehicle: ResponseGetClientByPPU | null;
  client: Client | null;
  ordersType: orderGroupResponse[] | [];
  sparesToWorkOrder: Spare[] | [];
  sparesFiltered: SpareFiltered[] | [];
  sparesOutStock: SparesWithoutStock[] | [];
  otByPPU :ResponseOTByPPU | []
}

const INITIAL_STATE: state = {
  workorder: null,
  workorders: [],
  message: {},
  vehicle: null,
  client: null,
  ordersType: [],
  sparesToWorkOrder: [],
  sparesFiltered: [],
  sparesOutStock: [],
  otByPPU:[]
};

export const WorkOrderState = ({ children }: stateProps) => {
  const [state, dispatch] = useReducer(WorkOrderReducer, INITIAL_STATE);

  const getClientByPPU = async (license_plate: string): Promise<void> => {
    try {
      const { data } = await api.get(`/vehicle/${license_plate}`);
      dispatch({
        type: "GET_CLIENTBYPPU",
        payload: data.vehicle.client,
      });
      dispatch({
        type: "GET_VEHICLEBYPPU",
        payload: data.vehicle,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getWorkOrderByPPU=async(ppu:string)=>{
    try {
      const {data} = await api.get(`/workorder/${ppu}`)
      console.log("getwoppu",data)
      dispatch({
        type:'GET_WORKORDERBYPPU',
        payload:data
      })
    } catch (error) {
      console.log(error)
    }
  }

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

  const cleanMessage = () => {
    dispatch({
      type: "CLEAN_MESSAGE",
    });
  };

  return (
    <WorkOrderContext.Provider
      value={{
        ...state,
        getClientByPPU,
        getWorkOrderType,
        addNewWorkOrder,
        getSparesToWorkOrder,
        filterSparesToWorkOrder,
        getWorkOrderByPPU,
        cleanClientNames,
        messageToShow,
        cleanSearchData,
        cleanMessage,
      }}
    >
      {children}
    </WorkOrderContext.Provider>
  );
};
