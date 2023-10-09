import * as yup from "yup";

export const clientSchema = yup.object({
  rut: yup
    .string()
    .required("El rut del cliente es requerido")
});
