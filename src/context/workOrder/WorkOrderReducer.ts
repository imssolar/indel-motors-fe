import { orderGroupResponse } from '../../types/orderGroup'
import { Spare } from '../../types/spare'
import { state } from './WorkOrderState'

type WorOrderReducerTypes =
	| { type: 'GET_CLIENTNAMES'; payload: string }
	| { type: 'GET_ORDERSTYPE'; payload: orderGroupResponse[] }
	| { type: 'GET_SPARESTOWORK'; payload: Spare[] }
	| { type: 'FILTER_SPARESTOWORK'; payload: number[] }

export const WorkOrderReducer = (
	state: state,
	action: WorOrderReducerTypes
) => {
	switch (action.type) {
		case 'GET_CLIENTNAMES':
			return {
				...state,
				clientNames: action.payload,
			}

		case 'GET_ORDERSTYPE':
			return {
				...state,
				ordersType: action.payload,
			}

		case 'GET_SPARESTOWORK':
			return {
				...state,
				sparesToWorkOrder: action.payload,
				sparesFiltered: action.payload,
			}

		case 'FILTER_SPARESTOWORK':
			return {
				...state,
				sparesFiltered: state.sparesToWorkOrder.map((spareWO) => {
					if (!action.payload.includes(spareWO.id)) {
						return { ...spareWO, isDisabled: false }
					}
					return { ...spareWO, isDisabled: true }
				}),
			}
		default:
			return state
	}
}
