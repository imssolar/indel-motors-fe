export type MessageType = "info" | "warning" | "error" | "search" | "notFound";

export interface Message {
  text?: string;
  type?: MessageType;
}
