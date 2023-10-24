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
  clients: Client[];
  message: string;
}

const INITIAL_STATE: state = {
  client: null,
  clients: [],
  message: "",
};

export const ClientState = ({ children }: stateProps) => {
  const [state, dispatch] = useReducer(ClientReducer, INITIAL_STATE);

  const getClients = async () => {
    try {
      const data = await api.get("/account");
      dispatch({
        type: "GET_CLIENTS",
        payload: data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addClient = async (clientToCreate: ClientCreate) => {
    try {
      await api.post("/account", clientToCreate, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      dispatch({
        type: "ADD_CLIENT",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editClient = async (clientToEdit: ClientCreate) => {
    try {
      const { data } = await api.put(
        `/account/${clientToEdit.rut}`,
        clientToEdit
      );
      dispatch({
        type: "EDIT_CLIENT",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const findCLient = async (clientRut: string) => {
    try {
      const { data } = await api.get(`/account/${clientRut}`);
      const { message } = data;
      if (message) {
        messageError(message);
        return;
      }
      dispatch({
        type: "FIND_CLIENT",
        payload: data,
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  const clearClientFinder = () => {
    dispatch({
      type: "CLEAR_CLIENT",
    });
  };

  const messageError = (message: string) => {
    console.log("message error");
    dispatch({
      type: "ERROR_CLIENT",
      payload: message,
    });
  };

  const changeStatusClient = async (clientRut: string) => {
    try {
      const {
        data: { message },
      } = await api.delete(`/account/${clientRut}`);
      dispatch({
        type: "DISABLED_CLIENT",
        
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        ...state,
        addClient,
        getClients,
        editClient,
        findCLient,
        clearClientFinder,
        messageError,
        changeStatusClient,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
