import { createContext } from 'react'
import { orderGroupRequest } from '../../types/orderGroup'
import { Message } from '../../types/message'

interface ContextProps {
	orderGroup: orderGroupRequest | null
	message: Message
	getOrderGroups: () => Promise<void>
	getOrderGroup: (orderGroup: orderGroupRequest) => Promise<void>
	addOrderGroup: (orderGroup: orderGroupRequest) => Promise<void>
	editOrderGroup: (orderGroup: orderGroupRequest) => Promise<void>
	updateOrderGroup: () => Promise<void>
	deleteOrderGroup: () => Promise<void>
	clearOrderGroupFinder: () => void
}

export const orderGroupContext = createContext({} as ContextProps)
