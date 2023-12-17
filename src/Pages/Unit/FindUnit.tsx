import { useContext, useEffect } from 'react'
import { UnitContext } from '../../context/Unit/UnitContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { unitSchema } from '../../schemas/unitSchema'
import { Layout } from '../../components/Layout/Layout'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	CssBaseline,
	Grid,
	TextField,
	Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal, { SweetAlertResult } from 'sweetalert2'

interface IUnitInput {
	name_unit: string
}

export const FindUnit = () => {
	const { unit, message, UnitFind, clearUnitFinder, deleteUnit } =
		useContext(UnitContext)

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IUnitInput>({ resolver: yupResolver(unitSchema) })

	const onSubmit: SubmitHandler<IUnitInput> = async (
		unitFormData: IUnitInput
	): Promise<void> => {
		UnitFind(unitFormData.name_unit)
	}
	const navigate = useNavigate()

	useEffect(() => {
		clearUnitFinder()
	}, [])

	useEffect((): void => {
		if (message.text && message.type === 'notFound') {
			Swal.fire({
				title: 'No encontrado',
				text: `${message.text}`,
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: '¿Desea crear el tipo de unidad?',
			}).then((result: SweetAlertResult<void>): void => {
				clearUnitFinder()
				if (result.isConfirmed) {
					navigate('/unit')
				}
			})
		} else if (message.text && message.type === 'info') {
			Swal.fire({
				icon: 'success',
				title: 'Buen trabajo!',
				text: `${message.text}`,
			})
		}
	}, [message?.text])

	const showDialog = (nameUnit: string): void => {
		Swal.fire({
			title: 'Eliminar Tipo de Unidad',
			text: 'Confirme la eliminación del tipo de Unidad',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar',
		}).then((result: SweetAlertResult<void>): void => {
			if (result.isConfirmed) {
				deleteUnit(nameUnit)
				clearUnitFinder()
			} else {
				clearUnitFinder()
			}
		})
	}

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
						Buscar Tipo de Unidad
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
									id="name_unit"
									label="Nombre de la unidad"
									{...register('name_unit')}
								/>
								{errors.name_unit && <p>{errors.name_unit.message}</p>}
							</Grid>
						</Grid>
						<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
							Buscar Unidad
						</Button>
						{unit && (
							<Card sx={{ minWidth: 275, maxWidth: 345 }}>
								<CardMedia
									component="img"
									height="160"
									image={'src/assets/images/measurement_background.jpg'}
								/>
								<CardContent>
									<Typography sx={{ mb: 1 }} variant="h5" component="div">
										Tipo de Unidad
									</Typography>
									<Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
										{unit.name_unit}
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
										textAlign="justify"
									>
										{unit.description}
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										variant="contained"
										color="success"
										onClick={(): void => navigate('/unit-edit')}
										size="small"
									>
										Editar
									</Button>
									<Button
										size="small"
										variant="contained"
										color="error"
										onClick={(): void => showDialog(unit.name_unit)}
									>
										Eliminar
									</Button>
								</CardActions>
							</Card>
						)}
					</Box>
				</Box>
			</Container>
		</Layout>
	)
}
