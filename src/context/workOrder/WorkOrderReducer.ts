import { Client } from "../../types/client";
import { Message } from "../../types/message";
import { orderGroupResponse } from "../../types/orderGroup";
import { Spare } from "../../types/spare";
import { Vehicle } from "../../types/vehicle";
import {
  ResponseGetClientByPPU,
  ResponseOTByPPU,
  SparesWithoutStock,
} from "../../types/workorder";
import { state } from "./WorkOrderState";

type WorOrderReducerTypes =
  | { type: "GET_CLIENTBYPPU"; payload: Client }
  | { type: "GET_VEHICLEBYPPU"; payload: Vehicle }
  | { type: "GET_WORKORDERBYPPU"; payload: ResponseOTByPPU[] }
  | { type: "GET_ORDERSTYPE"; payload: orderGroupResponse[] }
  | { type: "GET_SPARESTOWORK"; payload: Spare[] }
  | { type: "FILTER_SPARESTOWORK"; payload: number[] }
  | { type: "CLEAN_CLIENTNAMES" }
  | { type: "ADD_WORKORDER" }
  | { type: "MESSAGE_WORKORDER"; payload: Message }
  | { type: "SET_SPARESWITHOUTSTOCK"; payload: SparesWithoutStock[] }
  | { type: "CLEAN_SEARCH" }
  | { type: "CLEAN_MESSAGE" }
  | { type: "SET_REQUESTSPARE" };

export const WorkOrderReducer = (
  state: state,
  action: WorOrderReducerTypes
) => {
  switch (action.type) {
    case "GET_CLIENTBYPPU":
      return {
        ...state,
        client: action.payload,
      };

    case "GET_VEHICLEBYPPU":
      return {
        ...state,
        vehicle: action.payload,
      };

    case "GET_ORDERSTYPE":
      return {
        ...state,
        ordersType: action.payload,
      };

    case "GET_SPARESTOWORK":
      return {
        ...state,
        sparesToWorkOrder: action.payload,
        sparesFiltered: action.payload,
      };

    case "GET_WORKORDERBYPPU":
      return {
        ...state,
        otByPPU: action.payload,
      };

    case "ADD_WORKORDER":
      return {
        ...state,
      };

    case "FILTER_SPARESTOWORK":
      return {
        ...state,
        sparesFiltered: state.sparesToWorkOrder.map((spareWO) => {
          if (!action.payload.includes(spareWO.id)) {
            return { ...spareWO, isDisabled: false };
          }
          return { ...spareWO, isDisabled: true };
        }),
      };

    case "CLEAN_CLIENTNAMES":
      return {
        ...state,
        clientNames: null,
      };

    case "MESSAGE_WORKORDER":
      return {
        ...state,
        message: { text: action.payload.text, type: action.payload.type },
      };

    case "SET_SPARESWITHOUTSTOCK":
      return {
        ...state,
        sparesOutStock: action.payload,
      };

    case "CLEAN_SEARCH":
      return {
        ...state,
        sparesOutStock: [],
        message: {},
      };

    case "CLEAN_MESSAGE":
      return {
        ...state,
        message: {},
      };

    default:
      return state;
  }
};
