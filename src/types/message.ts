export type MessageType = "info" | "warning" | "error" | "search" | "notFound" | "outStock";

export interface Message {
  text?: string;
  type?: MessageType;
}
