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
import Swal from 'sweetalert2'

interface IUnitInput {
	name_unit: string
}

export const FindUnit = () => {
	const { unit, UnitFind, clearUnitFinder, deleteUnit } =
		useContext(UnitContext)

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IUnitInput>({ resolver: yupResolver(unitSchema) })

	const onSubmit: SubmitHandler<IUnitInput> = async (unitFormData) => {
		console.log(unitFormData)
		UnitFind(unitFormData.name_unit)
	}
	const navigate = useNavigate()

	useEffect(() => {
		clearUnitFinder()
	}, [])

	const showDialog = (unitName: string) => {
		Swal.fire({
			title: 'Eliminar Unidad',
			text: `Confirme la eliminación de la Unidad ${unitName}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				clearUnitFinder()
				deleteUnit(unitName)
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
										onClick={() => navigate('/unit-edit')}
										size="small"
									>
										Editar
									</Button>
									<Button
										size="small"
										variant="contained"
										color="error"
										onClick={() => showDialog(unit.name_unit)}
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
