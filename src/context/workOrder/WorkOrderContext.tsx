import { createContext } from "react";

import {
  RequestWO,
  ResponseGetClientByPPU,
  ResponseOTByPPU,
  ResponseWO,
  ResponseWOWithSpares,
  SparesWithoutStock,
} from "../../types/workorder";
import { orderGroupResponse } from "../../types/orderGroup";
import { Spare, SpareFiltered } from "../../types/spare";
import { Message } from "../../types/message";
import { Client } from "../../types/client";

interface ContextProps {
  workorder: ResponseWOWithSpares | null;
  workorders: ResponseWO[] | [];
  message: Message;
  ordersType: orderGroupResponse[] | [];
  sparesToWorkOrder: Spare[] | [];
  vehicle: ResponseGetClientByPPU | null;
  client: Client | null;
  sparesFiltered: SpareFiltered[] | [];
  sparesOutStock: SparesWithoutStock[] | [];
  otByPPU: ResponseOTByPPU[] | [];
  getClientByPPU: (license_plate: string) => void;
  getWorkOrderByPPU: (ppu: string) => void;
  getWorkOrderType: () => Promise<void>;
  getWorkOrderByOTNumber: (otNumber: number) => Promise<void>;
  getSparesToWorkOrder: () => Promise<void>;
  generateQuotationRequest: (newWorkOrder: RequestWO) => Promise<void>;
  generateQuationStatus: (workOrder: RequestWO) => Promise<void>;
  updateWO: (id: number, wo: RequestWO) => Promise<void>;
  setSparesWithoutStock: (sparesOut: SparesWithoutStock[]) => void;
  filterSparesToWorkOrder: (sparesIDs: number[]) => void;
  cleanClientNames: () => void;
  messageToShow: (message: Message) => void;
  cleanSearchData: () => void;
  cleanMessage: () => void;
}

export const WorkOrderContext = createContext({} as ContextProps);
