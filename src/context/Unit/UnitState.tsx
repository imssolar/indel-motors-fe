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

	const getUnits = async (): Promise<void> => {
		try {
			const { data } = await api.get('/unit')
			console.log(data)
		} catch (error) {
			console.log(error)
		}
	}

	const addUnit = async (unit: UnitToCreate): Promise<void> => {
		console.log(unit)
		try {
			const { data } = await api.post('/unit', unit)
			const { message, type } = data
			console.log(message, type)
			dispatch({
				type: 'ADD_UNIT',
			})
			messageToShow({ text: message, type })
		} catch (error: any) {
			const { message, type } = error.response.data
			messageToShow({ text: message, type })
			console.log(error)
		}
	}

	const editUnit = async (unit: UnitToCreate): Promise<void> => {
		try {
			const { data } = await api.put(`/unit/${unit.name_unit}`, unit)
			const { message, type } = data

			messageToShow({ text: message, type })
			dispatch({
				type: 'EDIT_UNIT',
				payload: { message, type },
			})
		} catch (error) {
			console.log(error)
		}
	}

	const UnitFind = async (unitName: string): Promise<void> => {
		try {
			const { data } = await api.get(`/unit/${unitName}`)
			const { message, type } = data
			if (type === 'notFound') {
				messageToShow({ text: message, type })
				return
			}
			dispatch({
				type: 'FIND_UNIT',
				payload: data.unit,
			})
		} catch (error: any) {
			console.log(error)
			const { message, type } = error.response.data
			messageToShow({ text: message, type })
			return
		}
	}

	const deleteUnit = async (unitName: string): Promise<void> => {
		const { data } = await api.delete(`/unit/${unitName}`)
		console.log(data)
		const { message, type } = data
		try {
			dispatch({
				type: 'DELETE_UNIT',
			})
			messageToShow({ text: message, type })
		} catch (error: any) {
			const { message, type } = error.response.data
			messageToShow({ text: message, type })
			return
		}
	}

	const clearUnitFinder = (): void => {
		dispatch({
			type: 'CLEAR_UNIT',
		})
	}

	const messageToShow = (message: Message): void => {
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
