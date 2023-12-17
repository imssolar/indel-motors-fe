/* eslint-disable no-useless-escape */
import * as yup from 'yup'

export const unitSchema = yup.object({
	name_unit: yup.string().required('El nombre de la unidad es obligatorio'),
	description: yup.string().max(255,'Máximo de caracteres alcanzado'),
})
