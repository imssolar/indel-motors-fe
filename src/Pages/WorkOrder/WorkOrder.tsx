import { Layout } from '../../components/Layout/Layout'
import { useContext, useEffect, useState } from 'react'
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
	Card,
	CardContent,
} from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import { RequestArraySpare, RequestWO, Spare } from '../../types/workorder'
import { WorkOrderContext } from '../../context/workOrder/WorkOrderContext'
import Swal from 'sweetalert2'

interface ISpare {
	id: number
	stock: number
	name: string
	isDisabled: boolean
}

export const WorkOrder = () => {
	const {
		handleSubmit,
		register,
		watch,
		setValue,
		formState: { errors },
	} = useForm<RequestWO>()

	const {
		sparesToWorkOrder,
		clientNames,
		ordersType,
		sparesFiltered,
		getClientNames,
		getWorkOrderType,
		getSparesToWorkOrder,
		filterSparesToWorkOrder,
	} = useContext(WorkOrderContext)

	const onSubmit: SubmitHandler<RequestWO> = async (formData) => {
		const newWorkOrder = {
			observations: formData.observations,
			ot_type: formData.ot_type,
			license_vehicle: formData.license_vehicle,
			spares,
		}
		const isAnyDefaultSpare = spares.some(
			(spare: RequestArraySpare): boolean =>
				spare.id === 0 || spare.stock === 0 || Number.isNaN(spare.stock)
		)
		console.log(isAnyDefaultSpare)

		if (isAnyDefaultSpare) {
			Swal.fire({
				icon: 'error',
				title: 'Ooops!',
				text: `Debes seleccionar repuesto y stock para crear la orden de trabajo`,
			})
			return
		}
	}
	const licenseValue = watch('license_vehicle')
	const namesValue = watch('names') ?? ''

	const [type, setType] = useState('')
	const [spares, setSpares] = useState<RequestArraySpare[]>([
		{ id: 0, stock: 0 },
	])

	const handleTypeOrderChange = (event: SelectChangeEvent): void => {
		console.log(event.target.value)
		setType(event.target.value as string)
	}

	const handleSpareID = (
		event: SelectChangeEvent,
		index: number,
		label: string = 'id'
	) => {
		console.log('handleSpareId', event.target.value)
		console.log('handleSpareId label: ', label)
		const mapSpare = spares.map(
			(spare: RequestArraySpare, indexSpare: number) => {
				if (indexSpare === index) {
					return {
						id: label === 'id' ? parseInt(event.target.value) : spare.id,
						stock:
							label === 'stock' ? parseInt(event.target.value) : spare.stock,
					}
				}
				return spare
			}
		)
		console.log('mapSpare:', mapSpare)
		const arrayIDs = mapSpare.map((spare) => spare.id)
		console.log(arrayIDs)
		filterSparesToWorkOrder(arrayIDs)
		setSpares(mapSpare)
	}

	useEffect(() => {
		console.log(licenseValue)
		if (licenseValue?.length >= 6) {
			console.log('licenseValue?.length >= 6')
			getClientNames(licenseValue)
			setValue('names', clientNames ?? '')
		} else {
			setValue('names', '')
		}
	}, [licenseValue])

	useEffect((): void => {
		getWorkOrderType()
		getSparesToWorkOrder()
	}, [])

	const AddNewSpare = (): void => {
		const newSpare = [{ id: 1, stock: 0 }]
		setSpares([...spares, ...newSpare])
	}

	return (
		<Layout>
			<Container
				component={'main'}
				maxWidth="lg"
				sx={{
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
				}}
			>
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
						Orden de Trabajo
					</Typography>
					<Box
						component={'form'}
						noValidate
						sx={{ mt: 3 }}
						onSubmit={handleSubmit(onSubmit)}
					>
						<Grid
							container
							spacing={3}
							maxWidth="lg"
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
							}}
						>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="license_plate"
									label="Patente"
									{...register('license_vehicle')}
								/>
								{errors.license_vehicle && (
									<p>{errors.license_vehicle.message}</p>
								)}
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="names"
									sx={{ opacity: '0.5' }}
									inputProps={{ readOnly: true }}
									label={namesValue?.length > 0 ? '' : 'Nombres / apellidos'}
									{...register('names')}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									required
									id="observations"
									{...register('observations')}
									placeholder="Observaciones"
								/>
							</Grid>

							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Tipo</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={type}
										label="Tipo de Orden"
										{...register('ot_type')}
										placeholder="Seleccione tipo de orden"
										onChange={handleTypeOrderChange}
									>
										{ordersType?.map((type) => (
											<MenuItem key={type.id} value={type.id}>
												{type.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
							Crear
						</Button>
					</Box>
				</Box>
				<Box>
					<Container component={'main'} maxWidth="xs">
						<CssBaseline />
						<Card>
							<CardContent>
								<Box
									sx={{
										marginTop: 1,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}
								>
									<Typography component={'h1'} variant="h5">
										Repuestos
									</Typography>
									<Grid
										container
										display={'flex'}
										justifyContent={'space-between'}
										alignItems={'center'}
										mt={2}
									>
										<Typography>Agregar repuestos</Typography>

										<Button
											onClick={() => AddNewSpare()}
											variant="contained"
											disabled={spares.length === sparesToWorkOrder.length}
										>
											+
										</Button>
									</Grid>
									<Box component={'form'} noValidate sx={{ mt: 3 }}>
										{spares.length > 0 &&
											spares.map(({ id }, index) => {
												return (
													<Box sx={{ flexGrow: 1, mb: 1 }}>
														<Grid container spacing={2}>
															<Grid item xs={6}>
																<FormControl fullWidth>
																	<InputLabel id="demo-simple-select-label">
																		Repuesto
																	</InputLabel>

																	<Select
																		labelId="demo-simple-select-label"
																		id={id.toString()}
																		label="Repuesto"
																		placeholder="Seleccione repuesto"
																		// {...register('ot_type')}
																		// value={id}
																		name={id.toString()}
																		onChange={(event) =>
																			handleSpareID(event, index)
																		}
																	>
																		{sparesFiltered?.map((spare: ISpare) => (
																			<MenuItem
																				key={spare.id}
																				value={spare.id}
																				disabled={spare.isDisabled}
																				style={
																					spare.isDisabled
																						? { display: 'none' }
																						: { display: 'block' }
																				}
																			>
																				{spare.name}
																			</MenuItem>
																		))}
																	</Select>
																</FormControl>
															</Grid>
															<Grid item xs={6}>
																<TextField
																	onChange={(event) =>
																		handleSpareID(event, index, 'stock')
																	}
																	label={'stock'}
																>
																	1
																</TextField>
															</Grid>
														</Grid>
													</Box>
												)
											})}
									</Box>
								</Box>
							</CardContent>
						</Card>
					</Container>
				</Box>
			</Container>
		</Layout>
	)
}
