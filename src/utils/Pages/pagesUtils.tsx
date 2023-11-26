import React from 'react'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import SearchIcon from '@mui/icons-material/Search'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import BuildIcon from '@mui/icons-material/Build'
import CarRepairIcon from '@mui/icons-material/CarRepair'
import BackupTableIcon from '@mui/icons-material/BackupTable'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
interface PageConstant {
	name: string
	path: string
	icon: React.ReactNode
}

export const clientPages: PageConstant[] = [
	{
		name: 'Buscar Cliente',
		path: '/client-find',
		icon: <SearchIcon />,
	},
	{
		name: 'Agregar Cliente',
		path: '/client',
		icon: <PersonAddAltIcon />,
	},
]

export const vehiclePages: PageConstant[] = [
	{
		name: 'Buscar Vehículos',
		path: '/vehicle-find',
		icon: <SearchIcon />,
	},
	{
		name: 'Agregar Vehículo',
		path: '/vehicle',
		icon: <CarRepairIcon />,
	},
]

export const workOrderPages: PageConstant[] = [
	{
		name: 'Buscar Orden de Trabajo',
		path: '/orders-list',
		icon: <SearchIcon />,
	},
	{
		name: 'Agregar Orden de Trabajo',
		path: '/work-order',
		icon: <NoteAddIcon />,
	},
]
export const sparePages: PageConstant[] = [
	{
		name: 'Buscar Repuesto',
		path: '/spare-list',
		icon: <SearchIcon />,
	},
	{
		name: 'Agregar Repuesto',
		path: '/spare',
		icon: <BuildIcon />,
	},
]

export const spareGroupPages: PageConstant[] = [
	{
		name: 'Buscar Grupos de Repuesto',
		path: '/sparegroup-list',
		icon: <SearchIcon />,
	},
	{
		name: 'Agregar Grupo de Repuesto',
		path: '/spare-group',
		icon: <BackupTableIcon />,
	},
]

export const unitPages: PageConstant[] = [
	{
		name: 'Buscar Unidad',
		path: '/unit-list',
		icon: <SearchIcon />,
	},

	{
		name: 'Agregar Unidad',
		path: '/unit',
		icon: <SquareFootIcon />,
	},
]
