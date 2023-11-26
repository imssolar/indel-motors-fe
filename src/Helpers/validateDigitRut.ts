const cleanRUT = (input: string) => {
	return input.replace(/\./g, '')
}

export const validateDigitRut = (rut: string) => {
	const cleanedRut = cleanRUT(rut)
	const digValidator = cleanedRut.slice(-1).toUpperCase()
	const valueRut = cleanedRut.slice(0, -2)
	let suma = 0
	let multiplo = 2
	for (let i = valueRut.length - 1; i >= 0; i--) {
		suma += multiplo * parseInt(valueRut.charAt(i), 10)
		multiplo = multiplo < 7 ? multiplo + 1 : 2
	}

	const valueEsperado = 11 - (suma % 11)

	const resultado =
		valueEsperado === 11 ? 0 : valueEsperado === 10 ? 'K' : valueEsperado
        console.log(resultado == digValidator)

	return resultado == digValidator
}
