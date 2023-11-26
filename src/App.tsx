import {
	Client,
	Login,
	Menu,
	EditClient,
	AddVehicle,
	FindVehicle,
} from './Pages'
import { AuthState } from './context/Auth/AuthState'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ClientState } from './context/Client/ClientState'
import './App.css'
import { FindClient } from './Pages/Client/FindClient'
import { VehicleState } from './context/Vehicle/VehicleState'
import { AddSpareGroup } from './Pages/spareGroup/AddSpareGroup'
import { SpareGroupState } from './context/SpareGroup/SpareGroupState'
import { EditSpareGroup } from './Pages/spareGroup/EditSpareGroup'
import { FindSpareGroup } from './Pages/spareGroup/FindSpareGroup'
import { AddUnit } from './Pages/Unit/AddUnit'
import { FindUnit } from './Pages/Unit/FindUnit'
import { UnitState } from './context/Unit/UnitState'
import { EditUnit } from './Pages/Unit/EditUnit'
function App() {
	const routes = createBrowserRouter([
		{
			path: '/',
			element: <Login />,
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/menu',
			element: <Menu />,
		},
		{
			path: '/client',
			element: <Client />,
		},

		{
			path: '/client-find',
			element: <FindClient />,
		},
		{
			path: '/client-edit',
			element: <EditClient />,
		},
		{
			path: '/vehicle-find',
			element: <FindVehicle />,
		},
		{
			path: '/vehicle',
			element: <AddVehicle />,
		},
		{
			path: '/sparegroup-list',
			element: <FindSpareGroup />,
		},

		{
			path: '/spare-group',
			element: <AddSpareGroup />,
		},
		{
			path: '/sparegroup-edit',
			element: <EditSpareGroup />,
		},
		{
			path: '/unit',
			element: <AddUnit />,
		},
		{
			path: '/unit-list',
			element: <FindUnit />,
		},
		{
			path: '/unit-edit',
			element: <EditUnit />,
		},
	])

	return (
		<AuthState>
			<ClientState>
				<VehicleState>
					<SpareGroupState>
						<UnitState>
							<RouterProvider router={routes} />
						</UnitState>
					</SpareGroupState>
				</VehicleState>
			</ClientState>
		</AuthState>
	)
}

export default App
