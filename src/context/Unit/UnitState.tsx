import { Message } from "../../types/message";
import { Unit } from "../../types/unit";

interface stateProps {
  children: React.ReactNode;
}

export interface state {
  unit: Unit;
  message: Message;
}

const INITITAL_STATE: state = {
  unit: null,
  message: {},
};

export const UnitState = () => {};
