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
	Tooltip,
	IconButton,
	CardActions,
} from '@mui/material'
import Swal from 'sweetalert2'
import { vehicleResponse } from '../../types/vehicle'
import { useContext } from 'react'
import { VehicleContext } from '../../context/Vehicle/VehicleContext'
import PersonIcon from '@mui/icons-material/Person'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled'
import DeleteIcon from '@mui/icons-material/Delete'
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
	const {
		brand,
		model,
		year_production,
		client: { names, surnames, email, rut },
	} = vehicle

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
								<Avatar sx={{ backgroundColor: 'black' }}>
									<PersonIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={`${names} ${surnames}`}
								secondary={`${rut} | ${email}`}
							/>
						</ListItem>
						<Divider variant="inset" component="li" />
						<ListItem>
							<ListItemAvatar>
								<Avatar sx={{ backgroundColor: 'black' }}>
									<DirectionsCarFilledIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={`${brand} ${model}`}
								secondary={`Año ${year_production}`}
							/>
						</ListItem>
						<Divider variant="inset" component="li" />
					</List>
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'end',
						pb: 2,
						pr: 2,
					}}
				>
					<Button
						variant="outlined"
						color="success"
						onClick={() => navigate('/client-edit')}
						size="small"
						sx={{ mr: 2 }}
					>
						Editar
					</Button>
					{/* <Tooltip title="Eliminar">
						<IconButton sx={{ color: 'red' }}>
							<DeleteIcon />
						</IconButton>
					</Tooltip> */}
					<Button
						size="small"
						variant="outlined"
						color="error"
						onClick={() => showDialog(client.rut)}
					>
						Eliminar
					</Button>
				</CardActions>
			</Card>
		)
	)
}
