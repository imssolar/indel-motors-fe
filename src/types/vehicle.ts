import { ClientCreate } from "./client";

export interface Vehicle {
  license_plate: string;
  brand: string;
  model: string;
  year_production: number;
  vin_number: number;
  rut_client: string;
}

export interface vehicleResponse extends Vehicle {
  createdAt: string;
  updatedAt: string;
  rut_client: string;
  client: ClientCreate;
}
