import { createContext } from 'react'
import { Message } from '../../types/message'
import { Unit, UnitToCreate } from '../../types/unit'

interface ContextProps {
	unit: Unit | null
	units: Unit[] | []
	message: Message
	getUnits: () => Promise<void>
	addUnit: (unit: UnitToCreate) => Promise<void>
	editUnit: (unit: UnitToCreate) => Promise<void>
	UnitFind: (unitName: string) => Promise<void>
	deleteUnit: (unitName: string) => Promise<void>
	clearUnitFinder: () => void
	messageToShow: (message: Message) => void
}

export const UnitContext = createContext({} as ContextProps)
