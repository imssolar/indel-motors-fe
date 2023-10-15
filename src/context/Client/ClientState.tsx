import React, { useReducer } from "react";
import { Client, ClientCreate } from "../../types/client";
import { ClientContext } from "./ClientContext";
import api from "../../api";
import { ClientReducer } from "./ClientReducer";

interface stateProps {
  children: React.ReactNode;
}

export interface state {
  client: Client | null;
  clients: [] | null;
}

const INITIAL_STATE: state = {
  client: null,
  clients: null,
};

export const ClientState = ({ children }: stateProps) => {
  const [state, dispatch] = useReducer(ClientReducer, INITIAL_STATE);

  // const getClients = async () => {
  //   try {
  //     const { data } = await api.get("/api/account");
  //     console.log(data);
  //     dispatch({
  //       type: "GET_CLIENTS",
  //       payload: data,
  //     });
  //   } catch (error) {
  //     console.log(error)
  //   }
  // };

  const addClient = async (clientToCreate: ClientCreate) => {
    console.log("add client");
    try {
      const { data } = await api.post("/api/account", clientToCreate, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      dispatch({
        type: "ADD_CLIENT",
        payload: data.client,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClientContext.Provider value={{ ...state, addClient }}>
      {children}
    </ClientContext.Provider>
  );
};
