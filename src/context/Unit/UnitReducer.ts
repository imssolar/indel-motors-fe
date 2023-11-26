import { Message } from '../../types/message'
import { Unit } from '../../types/unit'
import { state } from './UnitState'

type UnitActionType =
	| { type: 'ADD_UNIT' }
	| { type: 'EDIT_UNIT'; payload: Unit }
	| { type: 'FIND_UNIT'; payload: Unit }
	| { type: 'DELETE_UNIT' }
	| { type: 'MESSAGE_UNIT'; payload: Message }
	| { type: 'CLEAR_UNIT' ;}

export const UnitReducer = (state: state, action: UnitActionType) => {
	switch (action.type) {
		case 'ADD_UNIT':
			return {
				...state,
			}
		case 'EDIT_UNIT':
			return {
				...state,
				payload: action.payload,
			}
		case 'FIND_UNIT':
			return {
				...state,
				unit: action.payload,
			}
		case 'DELETE_UNIT':
			return {
				...state,
			}
		case 'CLEAR_UNIT':
			return {
				...state,
				unit: null,
				message: {},
			}
		case 'MESSAGE_UNIT':
			return {
				...state,
				message: { text: action.payload.text, type: action.payload.type },
			}
		default:
			return state
	}
}
