import { createContext } from "react";
import { newSpareGroup, spareGroup } from "../../types/spareGroup";
import { Message } from "../../types/message";

interface ContextProps {
  spareGroup: spareGroup | null;
  message: Message;
  addSpareGroup: (spareGroup: newSpareGroup) => Promise<void>;
  getSpareGroup: (id: string) => Promise<void>;
  editSpareGroup: (spareGroupEdit: newSpareGroup) => Promise<void>;
  deleteSpareGroup: (id: string) => Promise<void>;
  messageToShow: (message: Message) => void;
  clearSpareGroup: () => void;
}

export const spareGroupContext = createContext({} as ContextProps);
