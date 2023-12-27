import { createContext } from "react";

import {
  RequestWO,
  ResponseWO,
  SparesWithoutStock,
} from "../../types/workorder";
import { orderGroupResponse } from "../../types/orderGroup";
import { Spare, SpareFiltered } from "../../types/spare";
import { Message } from "../../types/message";

interface ContextProps {
  workorder: ResponseWO | null;
  workorders: ResponseWO[] | [];
  message: Message;
  ordersType: orderGroupResponse[] | [];
  sparesToWorkOrder: Spare[] | [];
  clientNames: string | null;
  sparesFiltered: SpareFiltered[] | [];
  sparesOutStock: SparesWithoutStock[] | [];
  getClientNames: (license_plate: string) => void;
  getWorkOrderType: () => Promise<void>;
  getSparesToWorkOrder: () => Promise<void>;
  addNewWorkOrder: (newWorkOrder: RequestWO) => Promise<void>;
  setSparesWithoutStock: (sparesOut: SparesWithoutStock[]) => void;
  filterSparesToWorkOrder: (sparesIDs: number[]) => void;
  cleanClientNames: () => void;
  messageToShow: (message: Message) => void;
  cleanSearchData: () => void;
  cleanMessage:()=>void
}

export const WorkOrderContext = createContext({} as ContextProps);
