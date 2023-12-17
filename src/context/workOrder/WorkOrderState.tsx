import { useReducer } from 'react'
import api from '../../api'
import { RequestArraySpare, ResponseWO } from '../../types/workorder'
import { WorkOrderReducer } from './WorkOrderReducer'
import { WorkOrderContext } from './WorkOrderContext'
import { orderGroupResponse } from '../../types/orderGroup'
import { Spare } from '../../types/spare'

interface stateProps {
	children: React.ReactNode
}

export interface state {
	workorder: ResponseWO | null
	workorders: ResponseWO[] | []
	clientNames: string
	ordersType: orderGroupResponse[] | []
	sparesToWorkOrder: Spare[] | []
	sparesFiltered: Spare[] | []
}

const INITITAL_STATE: state = {
	workorder: null,
	workorders: [],
	clientNames: '',
	ordersType: [],
	sparesToWorkOrder: [],
	sparesFiltered: [],
}

export const WorkOrderState = ({ children }: stateProps) => {
	const [state, dispatch] = useReducer(WorkOrderReducer, INITITAL_STATE)

	const getClientNames = async (license_plate: string): Promise<void> => {
		try {
			const {
				data: {
					vehicle: { client },
				},
			} = await api.get(`/vehicle/${license_plate}`)
			const { names, surnames } = client
			dispatch({
				type: 'GET_CLIENTNAMES',
				payload: `${names} ${surnames}`,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const getWorkOrderType = async (): Promise<void> => {
		try {
			const { data } = await api.get(`ordergroup`)
			dispatch({
				type: 'GET_ORDERSTYPE',
				payload: data,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const getSparesToWorkOrder = async (): Promise<void> => {
		try {
			const { data } = await api.get(`spare`)
			dispatch({
				type: 'GET_SPARESTOWORK',
				payload: data,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const filterSparesToWorkOrder = (sparesIDs: number[]) => {
		dispatch({
			type: 'FILTER_SPARESTOWORK',
			payload: sparesIDs,
		})
	}

	return (
		<WorkOrderContext.Provider
			value={{
				...state,
				getClientNames,
				getWorkOrderType,
				getSparesToWorkOrder,
				filterSparesToWorkOrder,
			}}
		>
			{children}
		</WorkOrderContext.Provider>
	)
}
