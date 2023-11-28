import { useForm, SubmitHandler } from 'react-hook-form'
import { Layout } from '../../components/Layout/Layout'
import {
	Box,
	Container,
	CssBaseline,
	Grid,
	TextField,
	Typography,
	Button,
} from '@mui/material'
import { useContext, useEffect } from 'react'
import { UnitContext } from '../../context/Unit/UnitContext'
import { unitSchema } from '../../schemas/unitSchema'
import { yupResolver } from '@hookform/resolvers/yup'
import Swal from 'sweetalert2'

interface IUnitInput {
	name_unit: string
	description?: string
}

export const EditUnit = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IUnitInput>({
		resolver: yupResolver(unitSchema),
	})

	const { unit, message, editUnit } = useContext(UnitContext)

	const onSubmit: SubmitHandler<IUnitInput> = async (formData) => {
		editUnit(formData)
	}

	useEffect((): void => {
		if (message.text && message.type === 'info') {
			Swal.fire({
				icon: 'success',
				title: 'Buen trabajo!',
				text: `${message.text}`,
			})
		}
		if (message.text && message.type === 'error') {
			Swal.fire({
				icon: 'error',
				title: 'Ooops!',
				text: `${message.text}`,
			})
		}
	}, [message.text, message.type])

	return (
		<Layout>
			{unit && (
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
							Editar Tipo de Unidad
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
										fullWidth
										id="name_unit"
										label="Nombre de la unidad"
										inputProps={{ readOnly: true }}
										sx={{ opacity: '0.5' }}
										{...register('name_unit')}
										defaultValue={unit.name_unit}
									/>
									{errors.name_unit && <p>{errors.name_unit.message}</p>}
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="description"
										label="Descripción del tipo de unidad"
										multiline
										{...register('description')}
										defaultValue={unit.description}
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
			)}
		</Layout>
	)
}
