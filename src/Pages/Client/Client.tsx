import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Button,
  Container,
  Select,
  FormControl,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { clientSchema } from "../../schemas/clientSchema";
import { MessageAlert } from "../../components/MessageAlert/MessageAlert";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../context/Client/ClientContext";

interface IFormInput {
  rut: string;
  names: string;
  surnames: string;
  phone: string;
  address: string;
  district: string;
  email: string;
}
export const Client = () => {
  //   const [district,setDistrict] = useState('')

  const { handleSubmit, register } = useForm<IFormInput>();

  const { addClient } = useContext(ClientContext);

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    console.log(formData);
    addClient(formData);
  };

  // useEffect(()=>{
  //   getClients()
  // },[])

  return (
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
          Crear Cliente
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
                required
                fullWidth
                id="rut"
                label="Rut cliente"
                {...register("rut")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="names"
                label="Nombres"
                {...register("names")}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="surnames"
                label="Apellidos"
                {...register("surnames")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Télefono contacto"
                {...register("phone")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Dirección"
                {...register("address")}
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
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Guardar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
