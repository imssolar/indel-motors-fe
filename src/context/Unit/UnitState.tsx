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
			const { data } = await api.put(`/unit/${unit}`, unit)
			dispatch({
				type: 'EDIT_UNIT',
				payload: data,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const findUnit = async (unitName: string) => {
		try {
			const { data } = await api.get(`/unit/${unitName}`)
			dispatch({
				type: 'FIND_UNIT',
				payload: data,
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
				findUnit,
				deleteUnit,
				messageToShow,
			}}
		>
			{children}
		</UnitContext.Provider>
	)
}
