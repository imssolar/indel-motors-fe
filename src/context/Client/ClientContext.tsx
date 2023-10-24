import { createContext } from "react";
import { Client, ClientCreate } from "../../types/client";

interface ContextProps {
  client: Client | null;
  clients: Client[];
  message: string;
  getClients: () => Promise<void>;
  addClient: (clientToCreate: ClientCreate) => Promise<void>;
  editClient: (clientToEdit: ClientCreate) => Promise<void>;
  findCLient: (clientRut: string) => Promise<void>;
  changeStatusClient: (clientRut:string)=>Promise<void>;
  clearClientFinder: () => void;
  messageError:(message:string)=>void
}

export const ClientContext = createContext({} as ContextProps);
