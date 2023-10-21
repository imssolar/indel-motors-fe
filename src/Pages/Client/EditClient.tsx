import {
  Box,
  CssBaseline,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Layout } from "../../components/Layout/Layout";
import { useForm, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { ClientCreate } from "../../types/client";
import { useContext } from "react";
import { ClientContext } from "../../context/Client/ClientContext";
import Swal from "sweetalert2";
interface IFormInput {
  rut: string;
  names: string;
  surnames: string;
  cellphone_number: string;
  address: string;
  district: string;
  email: string;
}

export const EditClient = () => {
  const { handleSubmit, register } = useForm<IFormInput>();

  const { editClient, client: clientToEdit } = useContext(ClientContext);

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    editClient(formData);
    Swal.fire({
      icon: "success",
      title: "",
      text: "El cliente ha sido editado con éxito",
    });
  };

  return (
    <Layout>
      {clientToEdit && (
        <Container component={"main"} maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component={"h1"} variant="h5">
              Editar Cliente
            </Typography>
            <Box
              component={"form"}
              noValidate
              sx={{ mt: 3 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                  sx={{opacity:"0.5"}}
                    fullWidth
                    id="rut"
                    label="Rut cliente"
                    {...register("rut")}
                    defaultValue={clientToEdit.rut}
                    inputProps={{ readOnly: true,disableUnderline:true }}
                    // disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="names"
                    label="Nombres"
                    {...register("names")}
                    defaultValue={clientToEdit.names}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="surnames"
                    label="Apellidos"
                    {...register("surnames")}
                    defaultValue={clientToEdit.surnames}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="cellphone_number"
                    label="Télefono contacto"
                    {...register("cellphone_number")}
                    defaultValue={clientToEdit.cellphone_number}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Dirección"
                    {...register("address")}
                    defaultValue={clientToEdit.address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="district"
                    label="Comuna"
                    type="district"
                    {...register("district")}
                    defaultValue={clientToEdit.district}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Correo"
                    type="email"
                    {...register("email")}
                    defaultValue={clientToEdit.email}
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
                Guardar
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </Layout>
  );
};
