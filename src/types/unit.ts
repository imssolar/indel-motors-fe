export interface Unit {
  id: string;
  name_unit: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UnitToCreate {
  name_unit: string;
  description?: string;
}
