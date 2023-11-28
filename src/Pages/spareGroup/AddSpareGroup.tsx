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

import { Layout } from '../../components/Layout/Layout'
import Swal from 'sweetalert2'
import { useContext, useEffect } from 'react'
import { spareGroupContext } from '../../context/SpareGroup/spareGroupContext'

interface IFormInput {
	name: string
	description: string
}
export const AddSpareGroup = () => {
	//   const [district,setDistrict] = useState('')

	const { handleSubmit, register } = useForm<IFormInput>()
	const { message, addSpareGroup } = useContext(spareGroupContext)

	const onSubmit: SubmitHandler<IFormInput> = async (
		formData: IFormInput
	): Promise<void> => {
		console.log(formData)
		addSpareGroup(formData)
	}

	useEffect((): void => {
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
						Crear Grupo de Repuesto
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
									id="name"
									label="Nombre del grupo de repuesto"
									{...register('name')}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="description"
									label="Descripción del grupo de repuesto"
									{...register('description')}
								/>
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
