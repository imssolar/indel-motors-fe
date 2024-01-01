


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
	CardMedia,
} from '@mui/material'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import Swal from 'sweetalert2'
import { spareGroupContext } from '../../context/SpareGroup/spareGroupContext'

interface IFormInput {
	name: string
}

export const FindOrderGroup = () => {
	const { handleSubmit, register } = useForm<IFormInput>()

	const {
		spareGroup,
		message,
		getSpareGroup,
		clearSpareGroup,
		deleteSpareGroup,
	} = useContext(spareGroupContext)

	const navigate = useNavigate()

	const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
		await getSpareGroup(formData.name)
		console.log(formData)
	}

	useEffect(() => {
		clearSpareGroup()
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
				confirmButtonText: '¿Desea crear el grupo de repuesto?',
			}).then((result) => {
				if (result.isConfirmed) {
					clearSpareGroup()
					navigate('/spare-group')
				} else {
					clearSpareGroup()
				}
			})
		}
	}, [message?.text])

	const showDialog = (clientRut: string) => {
		Swal.fire({
			title: 'Eliminar Grupo de repuesto',
			text: 'Confirme la eliminación del grupo de repuesto',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar',
		}).then((result) => {
			if (result.isConfirmed) {
				clearSpareGroup()
				deleteSpareGroup(clientRut)
			} else {
				clearSpareGroup()
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
						Buscar Grupo de Repuesto
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
									id="name"
									label="Nombre"
									{...register('name')}
								/>
							</Grid>
						</Grid>
						<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
							Buscar
						</Button>
					</Box>
					{spareGroup && (
						<Card sx={{ minWidth: 275, maxWidth: 345 }}>
							<CardMedia
								component="img"
								height="160"
								image={'src/assets/images/sparegroup_background.jpg'}
							/>
							<CardContent>
								<Typography sx={{ mb: 1 }} variant="h5" component="div">
									Grupo de Repuesto
								</Typography>
								<Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
									{spareGroup.name}
								</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									textAlign="justify"
								>
									{spareGroup.description}
								</Typography>
							</CardContent>
							<CardActions>
								<Button
									variant="contained"
									color="success"
									onClick={() => navigate('/sparegroup-edit')}
									size="small"
								>
									Editar
								</Button>
								<Button
									size="small"
									variant="contained"
									color="error"
									onClick={() => showDialog(spareGroup.name)}
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
