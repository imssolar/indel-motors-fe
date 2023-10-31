import { createContext } from "react";
import { Client, ClientCreate } from "../../types/client";
import { Message } from "../../types/message";



interface ContextProps {
  client: Client | null;
  clients: Client[];
  message: Message;
  getClients: () => Promise<void>;
  addClient: (clientToCreate: ClientCreate) => Promise<void>;
  editClient: (clientToEdit: ClientCreate) => Promise<void>;
  findCLient: (clientRut: string) => Promise<void>;
  deleteClient: (clientRut: string) => Promise<void>;
  clearClientFinder: () => void;
  messageToShow: (message: Message) => void;
}

export const ClientContext = createContext({} as ContextProps);
