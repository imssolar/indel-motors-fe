export interface Client {
  status: boolean;
  rut: string;
  names: string;
  surnames: string;
  cellphone_number: string;
  district: string;
  address: string;
  email: string;
  status_description:string
}

export interface ClientCreate {
  rut: string;
  names: string;
  surnames: string;
  cellphone_number: string;
  address: string;
  district: string;
  email: string;
}


