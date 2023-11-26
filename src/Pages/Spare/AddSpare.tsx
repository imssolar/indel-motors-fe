import {
	Box,
	CssBaseline,
	Grid,
	TextField,
	Typography,
	Button,
	Container,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { clientSchema } from '../../schemas/clientSchema'
import { useContext, useEffect } from 'react'
import { ClientContext } from '../../context/Client/ClientContext'
import { Layout } from '../../components/Layout/Layout'
import Swal from 'sweetalert2'
import { yupResolver } from '@hookform/resolvers/yup'

interface IFormInput {
	name: string
	cost: string
	stock: string
	cellphone_number: string
	address: string
	district: string
	email: string
}

export const AddSpare = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(clientSchema),
	})

	const { addClient, getClients, message } = useContext(ClientContext)

	const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
		console.log(formData)
		addClient(formData)
	}

	useEffect(() => {
		getClients()
	}, [])

	useEffect(() => {
		if (message.text && message.type === 'error') {
			console.log('type error')
			Swal.fire({
				icon: 'error',
				title: 'Ooops!',
				text: `${message.text}`,
			})
		}
		if (message.text && message.type === 'info') {
			Swal.fire({
				icon: 'success',
				title: 'Buen trabajo!',
				text: `${message.text}`,
			})
		}
	}, [message.text || message.type])

	return (
		<Layout>
			<Container component={'main'} maxWidth="xs">
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
						Crear Cliente
					</Typography>
					<Box
						component={'form'}
						noValidate
						sx={{ mt: 3 }}
						onSubmit={handleSubmit(onSubmit)}
					>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="rut"
									label="Rut cliente"
									{...register('rut')}
								/>
								{errors.rut && <p>{errors.rut.message}</p>}
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									fullWidth
									id="names"
									label="Nombres"
									{...register('names')}
								/>
								{errors.names && <p>{errors.names.message}</p>}
							</Grid>
							<Grid item xs={6}>
								<TextField
									required
									fullWidth
									id="surnames"
									label="Apellidos"
									{...register('surnames')}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="cellphone_number"
									label="Télefono contacto"
									{...register('cellphone_number')}
								/>
								{errors.cellphone_number && (
									<p>{errors.cellphone_number.message}</p>
								)}
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="address"
									label="Dirección"
									{...register('address')}
								/>
								{errors.address && <p>{errors.address.message}</p>}
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="district"
									label="Comuna"
									type="district"
									{...register('district')}
								/>
								{errors.district && <p>{errors.district.message}</p>}
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Correo"
									type="email"
									{...register('email')}
								/>
								{errors.email && <p>{errors.email.message}</p>}
							</Grid>
						</Grid>
						<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
							Guardar
						</Button>
					</Box>
				</Box>
			</Container>
		</Layout>
	)
}
