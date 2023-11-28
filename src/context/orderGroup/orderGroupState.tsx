import { useReducer } from 'react'
import { newOrderGroup, orderGroupRequest } from '../../types/orderGroup'
import { Message } from '../../types/message'
import { orderGroupReducer } from './orderGroupReducer'
import { orderGroupContext } from './orderGroupContext'
import api from '../../api'

interface stateProps {
	children: React.ReactNode
}

export interface state {
	orderGroup: newOrderGroup | null
	message: Message
}

const INITIAL_STATE: state = {
	orderGroup: null,
	message: {},
}
export const orderGroupState = ({ children }: stateProps) => {
	const [state, dispatch] = useReducer(orderGroupReducer, INITIAL_STATE)

	const getOrderGroups = async (): Promise<void> => {
		try {
			const { data } = await api.get('/ordergroup')
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}
	const getOrderGroup = async (
		orderGroup: orderGroupRequest
	): Promise<void> => {
		try {
			const { data } = await api.post(`/ordergroup/${orderGroup}`)
			dispatch({
				type: 'GET_ORDERGROUP',
				payload: data,
			})
		} catch (error) {
			console.log(error)
		}
	}
	const addOrderGroup = async (): Promise<void> => {}
	const editOrderGroup = async (): Promise<void> => {}
	const updateOrderGroup = async (): Promise<void> => {}
	const deleteOrderGroup = async (): Promise<void> => {}

	return (
		<orderGroupContext.Provider
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
		></orderGroupContext.Provider>
	)
}
