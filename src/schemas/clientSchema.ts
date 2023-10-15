import * as yup from "yup";

export const clientSchema = yup.object({
  rut: yup
    .string()
});
