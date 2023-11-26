import { useReducer } from 'react'
import { Message } from '../../types/message'
import { Unit, UnitToCreate } from '../../types/unit'
import api from '../../api'
import { UnitContext } from './UnitContext'
import { UnitReducer } from './UnitReducer'

interface stateProps {
	children: React.ReactNode
}

export interface state {
	unit: Unit | null
	message: Message
}

const INITITAL_STATE: state = {
	unit: null,
	message: {},
}

export const UnitState = ({ children }: stateProps) => {
	const [state, dispatch] = useReducer(UnitReducer, INITITAL_STATE)

	const getUnits = async () => {
		try {
			const { data } = await api.get('/unit')
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	const addUnit = async (unit: UnitToCreate) => {
		console.log(unit)
		try {
			const { data } = await api.post('/unit', unit)
			console.log(data)

			dispatch({
				type: 'ADD_UNIT',
			})
		} catch (error) {
			console.log(error)
		}
	}

	const editUnit = async (unit: UnitToCreate) => {
		try {
			const { data } = await api.put(`/unit/${unit.name_unit}`, unit)
			dispatch({
				type: 'EDIT_UNIT',
				payload: data,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const UnitFind = async (unitName: string) => {
		try {
			const {
				data: { unit },
			} = await api.get(`/unit/${unitName}`)
			console.log(unit)
			dispatch({
				type: 'FIND_UNIT',
				payload: unit,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const deleteUnit = async (unitName: string) => {
		const { data } = await api.delete(`/unit/${unitName}`)
		console.log(data)
		try {
			dispatch({
				type: 'DELETE_UNIT',
			})
		} catch (error) {
			console.log(error)
		}
	}

	const clearUnitFinder = () => {
		dispatch({
			type: 'CLEAR_UNIT',
		})
	}

	const messageToShow = (message: Message) => {
		dispatch({
			type: 'MESSAGE_UNIT',
			payload: message,
		})
	}

	return (
		<UnitContext.Provider
			value={{
				...state,
				getUnits,
				editUnit,
				addUnit,
				UnitFind,
				deleteUnit,
				clearUnitFinder,
				messageToShow,
			}}
		>
			{children}
		</UnitContext.Provider>
	)
}
