import { Client } from "./client";
import { Vehicle } from "./vehicle";

export interface RequestWO {
  observations: string;
  ot_type: number;
  license_vehicle: string;
  spares: SpareRequest[];
  names?: string;
  brand?: string;
  model?: string;
  rut?: string;
  surnames?: string;
  is_confirmed:boolean;
  is_payment:boolean;
}

interface SpareRequest{
  id:string;
  stock:number;
}
export interface RequestArraySpare {
  id: number;
  stock: number;
  quantity: number;
  name: string;
  total: number;
  code: string;
  value: number;
}

export interface SparesWithoutStock {
  name: string;
  stockThatINeed: number;
  requestedStock: number;
  currentStock: number;
}

// Generated by https://quicktype.io

export interface ResponseWO {
  ot_number: number;
  date?: string;
  observations: string;
  createdAt: string;
  updatedAt: string;
  license_vehicle: string;
  ot_type: number;
  spares: Spare[];
}

export interface Spare {
  id: number;
  name: string;
  cost: number;
  stock: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  unit_id?: number;
  spareGroup_id: number;
  workOrderId?: number;
  workorderspare: Workorderspare;
}

export interface Workorderspare {
  createdAt: string;
  updatedAt: string;
  workOrderOtNumber: number;
  spareId: number;
}

export interface ResponseGetClientByPPU {
  license_plate: string;
  brand: string;
  model: string;
  year_production: number;
  vin_number: number;
  rut_client: string;
  client: Client;
}

export interface ResponseOTByPPU {
  ot_number: number;
  date: string;
  observations: string;
  createdAt: string;
  updatedAt: string;
  license_vehicle: string;
  ot_type: number;
}

export interface RequestTest {
  observations: string;
  license_vehicle: string;
  brand: string;
  model: string;
  names: string;
  surnames: string;
  rut: string;
  ot_type:string;
  is_confirmed:boolean;
  is_payment:boolean;
}
