import { Message } from '../../types/message'
import { Unit } from '../../types/unit'
import { state } from './UnitState'

type UnitActionType =
	| { type: 'ADD_UNIT' }
	| { type: 'EDIT_UNIT';payload:{message:string,type:string}}
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
				message:{text:action.payload.message,type:action.payload.type}
			}
		case 'FIND_UNIT':
			return {
				...state,
				unit: action.payload,
				message:{}
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
				unit:null
			}
		default:
			return state
	}
}
