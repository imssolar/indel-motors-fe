export interface createSpare {
  name: string;
  cost: string;
  stock: string;
  unit_id: string;
  spareGroup_id: string;
}

export interface Spare {
  status: boolean;
  id: number;
  name: string;
  cost: number;
  stock: number;
  unit_id: number;
  spareGroup_id: number;
  updatedAt: string;
  createdAt: string;
  code_id:string
}

export interface SpareFiltered extends Spare{
  isDisabled:boolean
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
