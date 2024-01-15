import * as yup from 'yup'

export const vehicleSchema = yup.object({
	license_plate: yup
		.string()
		.required('La patente del vehículo es obligatoria')
		.matches(
			/([A-Z]{2})([A-Z,0-9]{2})(-)?(\d{2})/g,
			'Formato incorrecto de la patente'
		).transform((value)=> value.toUpperCase()),
	brand: yup.string().required('El brand es obligatorio'),
	model: yup.string().required('El model es obligatorio'),
	year_production: yup.number().required('El year_production es obligatorio').typeError("Campo numérico"),
	vin_number: yup.string().required('El vin_number es obligatorio'),
	rut_client: yup
		.string()
		.required('El rut es obligatorio')
		.matches(
			/\b\d{1,2}\.\d{3}\.\d{3}\-[K|k|0-9]/g,
			'Formato incorrecto del Rut. Agregar puntos y guión'
		),
})
