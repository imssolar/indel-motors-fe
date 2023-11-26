import { Layout } from '../../components/Layout/Layout'

import {
	Box,
	CssBaseline,
	Container,
	Typography,
	Grid,
	TextField,
	Button,
	Card,
	CardContent,
	CardActions,
	Divider,
} from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Swal from 'sweetalert2'
import { VehicleContext } from '../../context/Vehicle/VehicleContext'

interface IFormInput {
	license_plate: string
}

export const FindVehicle = () => {
	const { handleSubmit, register } = useForm<IFormInput>()

	const { vehicle, message, getVehicle, clearVehicleFinder, deleteVehicle } =
		useContext(VehicleContext)

	const navigate = useNavigate()

	const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
		await getVehicle(formData.license_plate)
		console.log(formData)
	}

	useEffect(() => {
		clearVehicleFinder()
	}, [])

	useEffect(() => {
		if (message.text && message.type === 'notFound') {
			Swal.fire({
				title: 'No encontrado',
				text: `${message.text}`,
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: '¿Desea crear el vehículo?',
			}).then((result) => {
				if (result.isConfirmed) {
					//   clearClientFinder();
					navigate('/vehicle')
				} else {
					//   clearClientFinder();
				}
			})
		}
	}, [message?.text])

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

	return (
		<Layout>
			<Container component={'main'}>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Typography component={'h1'} variant="h5">
						Buscar Vehículo
					</Typography>
					<Box
						component={'form'}
						noValidate
						sx={{ mt: 3 }}
						onSubmit={handleSubmit(onSubmit)}
					>
						<Grid container spacing={3} xs={12}>
							<Grid item>
								<TextField
									required
									fullWidth
									id="license_plate"
									label="Patente"
									{...register('license_plate')}
								/>
							</Grid>
						</Grid>
						<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
							Buscar
						</Button>
					</Box>
					{vehicle && (
						<Card sx={{ minWidth: 275 }}>
							<CardContent>
								<Typography sx={{ mb: 1 }} variant="h5" component="div">
									Datos del Vehículo
								</Typography>
								<Typography>{vehicle.license_plate}</Typography>
								<Typography>{vehicle.brand}</Typography>
								<Divider />
								<Typography variant="h5" sx={{ mb: 1, mt: 1 }}>
									Contacto
								</Typography>
								{/* <Typography>{client.email}</Typography>
                <Typography>{client.cellphone_number}</Typography> */}
							</CardContent>
							<CardActions>
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
							</CardActions>
						</Card>
					)}
				</Box>
			</Container>
		</Layout>
	)
}
