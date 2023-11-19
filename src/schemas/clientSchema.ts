/* eslint-disable no-useless-escape */
import * as yup from 'yup'

export const clientSchema = yup.object({
	rut: yup
		.string()
		.required('El rut es obligatorio')
		.matches(
			/\b\d{1,2}\.\d{3}\.\d{3}\-[K|k|0-9]/g,
			'Formato incorrecto del Rut. Agregar puntos y guión'
		),
	names: yup.string().required('El o los nombres del cliente son obligatorios'),
	surnames: yup
		.string()
		.required('El o los apellidos del cliente son obligatorios'),
	cellphone_number: yup
		.string()
		.required('Teléfono Celular es requerido')
		.matches(
			/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
			'Sólo números'
		),
	address: yup.string().required('La dirección del cliente es obligatoria'),
	district: yup.string().required('La comuna del cliente es obligatoria'),
	email: yup
		.string()
		.required('El correo es obligatorio')
		.matches(
			/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
			'Formato incorrecto del correo electrónico'
		),
})
