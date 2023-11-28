import { orderGroupResponse } from '../../types/orderGroup'
import { state } from './orderGroupState'

type orderGroupActions =
	| { type: 'GET_ORDERGROUPS' }
	| { type: 'GET_ORDERGROUP'; payload: orderGroupResponse }
	| { type: 'ADD_ORDERGROUP'; payload: orderGroupResponse }

export const orderGroupReducer = (state: state, action: orderGroupActions) => {
	switch (action.type) {
		case 'GET_ORDERGROUPS':
			return {
				...state,
			}
		case 'GET_ORDERGROUP':
			return {
				...state,
				orderGroup: action.payload,
			}

		case 'ADD_ORDERGROUP':
			return {
				...state,
				orderGroup: action.payload,
			}
	}
}
