
import * as yup from 'yup';


export const schema = yup.object().shape({
    email: yup.string().email().required("El campo es requerido"),
    password: yup.string().required("El campo es requerido"),
  });




