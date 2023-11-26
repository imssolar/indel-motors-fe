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
import { useContext } from 'react'
import { Layout } from '../../components/Layout/Layout'
import { yupResolver } from '@hookform/resolvers/yup'
import { unitSchema } from '../../schemas/unitSchema'
import { UnitContext } from '../../context/Unit/UnitContext'

interface IFormInput {
	name_unit: string
	description?: string
}

export const AddUnit = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IFormInput>({
		resolver: yupResolver(unitSchema),
	})

	const { addUnit } = useContext(UnitContext)

	const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
		console.log(formData)
		addUnit(formData)
	}

	// useEffect(() => {
	// 	if (message.text && message.type === 'error') {
	// 		console.log('type error')
	// 		Swal.fire({
	// 			icon: 'error',
	// 			title: 'Ooops!',
	// 			text: `${message.text}`,
	// 		})
	// 	}
	// 	if (message.text && message.type === 'info') {
	// 		Swal.fire({
	// 			icon: 'success',
	// 			title: 'Buen trabajo!',
	// 			text: `${message.text}`,
	// 		})
	// 	}
	// }, [message.text || message.type])

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
						Crear Unidad
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
							<Grid item xs={12}>
								<TextField
									fullWidth
									id="description"
									label="Descripción"
									{...register('description')}
								/>
								{errors.description && <p>{errors.description.message}</p>}
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
