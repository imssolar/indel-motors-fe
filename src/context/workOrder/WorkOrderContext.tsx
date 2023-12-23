import { createContext } from 'react'

import { ResponseWO } from '../../types/workorder'
import { orderGroupResponse } from '../../types/orderGroup'
import { Spare, SpareFiltered } from '../../types/spare'

interface ContextProps {
	workorder: ResponseWO | null
	workorders: ResponseWO[] | []
	ordersType: orderGroupResponse[] | []
	sparesToWorkOrder: Spare[] | []
	clientNames: string | null
	sparesFiltered: SpareFiltered[] | []
	getClientNames: (license_plate: string) => void
	getWorkOrderType: () => Promise<void>
	getSparesToWorkOrder: () => Promise<void>
	filterSparesToWorkOrder: (sparesIDs: number[]) => void
}

export const WorkOrderContext = createContext({} as ContextProps)
