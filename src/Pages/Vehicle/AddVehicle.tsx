import {
	Box,
	CssBaseline,
	Grid,
	TextField,
	Typography,
	Button,
	Container,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	SelectChangeEvent,
} from '@mui/material'
import { Layout } from '../../components/Layout/Layout'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { VehicleContext } from '../../context/Vehicle/VehicleContext'
import { schema } from '../../schemas/vehicleSchema'
import { yupResolver } from '@hookform/resolvers/yup'

interface IVehicleInput {
	license_plate: string
	brand: string
	model: string
	year_production: number
	vin_number: string
	rut_client: string
}

export const AddVehicle = () => {
	const [brandSelect, setBrand] = useState('')
	const {
		handleSubmit,
		register,
		formState: { errors, isValid },
		watch,
		setValue,
		trigger,
	} = useForm<IVehicleInput>({ resolver: yupResolver(schema) })
	const { brands, addVehicle, getBrands } = useContext(VehicleContext)

	const handleChange = (event: SelectChangeEvent) => {
		setValue('brand', event.target.value)
		console.log(event.target.value)
		setBrand(event.target.value as string)
	}

	const onSubmit: SubmitHandler<IVehicleInput> = async (formData) => {
		await trigger()
		console.log('hola')
		console.log(formData)
		// console.log(formData.brand)
		addVehicle(formData)
	}

	useEffect(() => {
		getBrands()
	}, [])

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
						Crear Vehículo
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
									id="license_plate"
									label="Patente"
									{...register('license_plate')}
								/>
								{errors.license_plate && <p>{errors.license_plate.message}</p>}
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="rut"
									label="Rut asociado"
									{...register('rut_client')}
								/>
								{errors.rut_client && <p>{errors.rut_client.message}</p>}
							</Grid>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Marca</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={brandSelect}
										label="Marca"
										{...register('brand')}
										onChange={handleChange}
									>
										{brands.map((brands) => (
											<MenuItem key={brands.id} value={brands.name}>
												{brands.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							{errors.brand && <p>{errors.brand.message}</p>}

							<Grid item xs={6}>
								<TextField
									required
									fullWidth
									id="model"
									label="Modelo"
									{...register('model')}
								/>
							</Grid>
							{errors.model && <p>{errors.model.message}</p>}

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="year_production"
									label="Año de Fabricación"
									{...register('year_production')}
								/>
							</Grid>
							{errors.year_production && (
								<p>{errors.year_production.message}</p>
							)}

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="vin_number"
									label="Número de Chasis"
									{...register('vin_number')}
								/>
							</Grid>
							{errors.vin_number && <p>{errors.vin_number.message}</p>}
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
