import { createContext } from "react";
import { Client, ClientCreate } from "../../types/client";

interface ContextProps {
  client: Client | null;
  addClient: (clientToCreate: ClientCreate) => Promise<void>;
  getClients: () => Promise<void>;
}

export const ClientContext = createContext({} as ContextProps);
