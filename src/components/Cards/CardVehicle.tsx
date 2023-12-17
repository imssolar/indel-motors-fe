import {
	Button,
	CardActionArea,
	CardContent,
	Typography,
	Card,
	Divider,
	CardMedia,
	Box,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	List,
} from '@mui/material'
import Swal from 'sweetalert2'
import { vehicleResponse } from '../../types/vehicle'
import { useContext } from 'react'
import { VehicleContext } from '../../context/Vehicle/VehicleContext'
import PersonIcon from '@mui/icons-material/Person'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled'
interface CardVehicleProps {
	vehicle: vehicleResponse
}

export const CardVehicle = ({ vehicle }: CardVehicleProps) => {
	const { deleteVehicle } = useContext(VehicleContext)

	const showDialog = (clientRut: string) => {
		Swal.fire({
			title: 'Eliminar Vehículo',
			text: 'Confirme la eliminación del vehículo',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				// clearClientFinder();
				deleteVehicle(clientRut)
			} else {
				// clearClientFinder();
			}
		})
	}

	console.log('cardVehicle', vehicle)
	// const {
	// 	client: { names, surnames },
	// } = vehicle

	return (
		vehicle && (
			<Card sx={{ minWidth: 350, maxWidth: 400 }}>
				<CardMedia
					component="img"
					height="160"
					image={'src/assets/images/card-vehicle.jpg'}
				/>
				<CardContent>
					<List
						sx={{
							width: '100%',
							maxWidth: 350,
							bgcolor: 'background.paper',
						}}
					>
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<PersonIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Photos" secondary="Jan 9, 2014" />
						</ListItem>
						<Divider variant="inset" component="li" />
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<PersonIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Work" secondary="Jan 7, 2014" />
						</ListItem>
						<Divider variant="inset" component="li" />
						<ListItem>
							<ListItemAvatar>
								<Avatar>
									<PersonIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Vacation" secondary="July 20, 2014" />
						</ListItem>
					</List>
				</CardContent>
				<CardActionArea sx={{ display: 'flex', justifyContent: 'start' }}>
					<Button
						variant="contained"
						color="success"
						onClick={() => navigate('/client-edit')}
						size="small"
					>
						Editar
					</Button>
					<Button
						size="small"
						variant="contained"
						color="error"
						onClick={() => showDialog(client.rut)}
					>
						Eliminar
					</Button>
				</CardActionArea>
			</Card>
		)
	)
}
