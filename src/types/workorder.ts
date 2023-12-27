export interface RequestWO {
  observations: string;
  ot_type: number;
  license_vehicle: string;
  spares: Spare[];
  names?: string;
}

export interface RequestArraySpare {
  id: number;
  stock: number;
}

export interface SparesWithoutStock {
  name: string;
  stockThatINeed: number;
  requestedStock:number;
  currentStock:number;
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