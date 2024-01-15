import { createContext } from 'react'
import { orderGroupRequest, orderGroupResponse } from '../../types/orderGroup'
import { Message } from '../../types/message'

interface ContextProps {
	orderGroup: orderGroupResponse[] | []
	message: Message
	getOrderGroups: () => Promise<void>
	getOrderGroup: (orderGroup: orderGroupRequest) => Promise<void>
	addOrderGroup: (orderGroup: orderGroupRequest) => Promise<void>
	editOrderGroup: (orderGroup: orderGroupRequest) => Promise<void>
	updateOrderGroup: () => Promise<void>
	deleteOrderGroup: () => Promise<void>
	clearOrderGroupFinder: () => void
}

export const OrderGroupContext = createContext({} as ContextProps)
