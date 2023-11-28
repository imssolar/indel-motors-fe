import { Box, Container, CssBaseline, Typography } from '@mui/material'
import { Layout } from '../../components/Layout/Layout'
import { SubmitHandler, useForm } from 'react-hook-form'

interface IFormInput {
	name: string
}

export const AddOrderGroup = () => {
	const { handleSubmit } = useForm<IFormInput>()
	const onSubmit: SubmitHandler<IFormInput> = (formData) => {
		console.log(formData)
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
					<Typography>Crear Tipo de Orden de Trabajo</Typography>
					<Box
						component={'form'}
						noValidate
						sx={{ mt: 3 }}
						onSubmit={handleSubmit(onSubmit)}
					></Box>
				</Box>
			</Container>
		</Layout>
	)
}
