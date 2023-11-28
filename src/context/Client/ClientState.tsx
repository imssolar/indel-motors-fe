import React, { useReducer } from 'react'
import { Client, ClientCreate } from '../../types/client'
import { ClientContext } from './ClientContext'
import api from '../../api'
import { ClientReducer } from './ClientReducer'
import { Message } from '../../types/message'

interface stateProps {
	children: React.ReactNode
}

export interface state {
	client: Client | null
	clients: Client[]
	message: Message
}

const INITIAL_STATE: state = {
	client: null,
	clients: [],
	message: {},
}

export const ClientState = ({ children }: stateProps) => {
	const [state, dispatch] = useReducer(ClientReducer, INITIAL_STATE)

	const getClients = async () => {
		try {
			const data = await api.get('/account')
			dispatch({
				type: 'GET_CLIENTS',
				payload: data.data,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const addClient = async (clientToCreate: ClientCreate): Promise<void> => {
		try {
			const { data } = await api.post('/account', clientToCreate, {
				headers: {
					'x-token': localStorage.getItem('token'),
				},
			})
			console.log(data)
			dispatch({
				type: 'ADD_CLIENT',
			})
			messageToShow({ text: data.message, type: data.type })
		} catch (error: any) {
			const { message, type } = error.response.data
			messageToShow({ text: message, type })
			return
		}
	}

	const editClient = async (clientToEdit: ClientCreate): Promise<void> => {
		try {
			const { data } = await api.put(
				`/account/${clientToEdit.rut}`,
				clientToEdit
			)
			const { message, type } = data
			console.log(message, type)
			dispatch({
				type: 'EDIT_CLIENT',
				payload: data,
			})
		} catch (error: any) {
			const { message, type } = error.response.data
			messageToShow({ text: message, type })
			return
		}
	}

	const findCLient = async (clientRut: string): Promise<void> => {
		try {
			const { data } = await api.get(`/account/${clientRut}`)
			const { message, type } = data
			if (type === 'notFound') {
				messageToShow({ text: message, type })
				return
			}
			dispatch({
				type: 'FIND_CLIENT',
				payload: data.client,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const clearClientFinder = (): void => {
		dispatch({
			type: 'CLEAR_CLIENT',
		})
	}

	const messageToShow = (message: Message): void => {
		dispatch({
			type: 'MESSAGE_CLIENT',
			payload: message,
		})
	}

	const deleteClient = async (clientRut: string): Promise<void> => {
		try {
			const { data } = await api.delete(`/account/${clientRut}`)
			console.log(data)
			dispatch({
				type: 'DELETE_CLIENT',
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<ClientContext.Provider
			value={{
				...state,
				addClient,
				getClients,
				editClient,
				findCLient,
				clearClientFinder,
				messageToShow,
				deleteClient,
			}}
		>
			{children}
		</ClientContext.Provider>
	)
}
