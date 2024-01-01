import { createContext } from "react";

import {
  RequestWO,
  ResponseGetClientByPPU,
  ResponseOTByPPU,
  ResponseWO,
  SparesWithoutStock,
} from "../../types/workorder";
import { orderGroupResponse } from "../../types/orderGroup";
import { Spare, SpareFiltered } from "../../types/spare";
import { Message } from "../../types/message";
import { Client } from "../../types/client";

interface ContextProps {
  workorder: ResponseWO | null;
  workorders: ResponseWO[] | [];
  message: Message;
  ordersType: orderGroupResponse[] | [];
  sparesToWorkOrder: Spare[] | [];
  vehicle: ResponseGetClientByPPU | null;
  client: Client | null;
  sparesFiltered: SpareFiltered[] | [];
  sparesOutStock: SparesWithoutStock[] | [];
  otByPPU: ResponseOTByPPU | []
  getClientByPPU: (license_plate: string) => void;
  getWorkOrderByPPU: (ppu: string) => void;
  getWorkOrderType: () => Promise<void>;
  getSparesToWorkOrder: () => Promise<void>;
  addNewWorkOrder: (newWorkOrder: RequestWO) => Promise<void>;
  setSparesWithoutStock: (sparesOut: SparesWithoutStock[]) => void;
  filterSparesToWorkOrder: (sparesIDs: number[]) => void;
  cleanClientNames: () => void;
  messageToShow: (message: Message) => void;
  cleanSearchData: () => void;
  cleanMessage: () => void;
}

export const WorkOrderContext = createContext({} as ContextProps);
