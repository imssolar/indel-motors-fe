import { useReducer } from "react";
import { orderGroupRequest, orderGroupResponse } from "../../types/orderGroup";
import { Message } from "../../types/message";

import api from "../../api";
import { OrderGroupReducer } from "./orderGroupReducer";
import { OrderGroupContext } from "./orderGroupContext";

interface stateProps {
  children: React.ReactNode;
}

export interface state {
  orderGroup: orderGroupResponse[] | [];
  message: Message;
}

const INITIAL_STATE: state = {
  orderGroup: [],
  message: {},
};
export const OrderGroupState = ({ children }: stateProps) => {
  const [state, dispatch] = useReducer(OrderGroupReducer, INITIAL_STATE);

  const getOrderGroups = async (): Promise<void> => {
    try {
      const { data } = await api.get("/ordergroup");
      dispatch({
        type: "GET_ORDERGROUPS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getOrderGroup = async (
    orderGroup: orderGroupRequest
  ): Promise<void> => {
    try {
      const { data } = await api.post(`/ordergroup/${orderGroup}`);
      dispatch({
        type: "GET_ORDERGROUP",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addOrderGroup = async (
    orderGroup: orderGroupRequest
  ): Promise<void> => {
    try {
      await api.post("/ordergroup", orderGroup);
      dispatch({
        type: "ADD_ORDERGROUP",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const editOrderGroup = async (): Promise<void> => {};
  const updateOrderGroup = async (): Promise<void> => {};
  const deleteOrderGroup = async (): Promise<void> => {};
  const clearOrderGroupFinder = () => {};

  return (
    <OrderGroupContext.Provider
      value={{
        ...state,
        getOrderGroups,
        getOrderGroup,
        addOrderGroup,
        editOrderGroup,
        updateOrderGroup,
        deleteOrderGroup,
        clearOrderGroupFinder,
      }}
    >
      {children}
    </OrderGroupContext.Provider>
  );
};
