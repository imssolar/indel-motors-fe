import { Layout } from "../../components/Layout/Layout";

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
  Divider,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { Client, ClientCreate } from "../../types/client";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../context/Client/ClientContext";
import Swal from "sweetalert2";

interface IFormInput {
  rut: string;
}

export const FindClient = () => {
  const { handleSubmit, register } = useForm<IFormInput>();

  const { client, message, findCLient, clearClientFinder, deleteClient } =
    useContext(ClientContext);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    await findCLient(formData.rut);
    console.log(formData);
  };

  useEffect(() => {
    clearClientFinder();
  }, []);

  useEffect(() => {
    if (message.text && message.type === "notFound") {
      Swal.fire({
        title: "No encontrado",
        text: `${message.text}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¿Desea crear al cliente?",
      }).then((result) => {
        if (result.isConfirmed) {
          clearClientFinder();
          navigate("/client");
        } else {
          clearClientFinder();
        }
      });
    }
  }, [message?.text]);

  const showDialog = (clientRut: string) => {
    Swal.fire({
      title: "Eliminar Cliente",
      text: "Confirme la eliminación del cliente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        clearClientFinder();
        deleteClient(clientRut);
      } else {
        clearClientFinder();
      }
    });
  };

  return (
    <Layout>
      <Container component={"main"}>
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
            Buscar Cliente
          </Typography>
          <Box
            component={"form"}
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={3} xs={12}>
              <Grid item>
                <TextField
                  required
                  fullWidth
                  id="rut"
                  label="Rut"
                  {...register("rut")}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Buscar
            </Button>
          </Box>
          {client && (
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ mb: 1 }} variant="h5" component="div">
                  {client.names} {client.surnames}
                </Typography>
                <Divider />
                <Typography variant="h5" sx={{ mt: 1, mb: 1 }}>
                  Datos Personales
                </Typography>
                <Typography sx={{ mt: 1 }} component="div">
                  {client.rut}
                </Typography>
                <Typography>{client.address}</Typography>
                <Typography>{client.district}</Typography>
                <Divider />
                <Typography variant="h5" sx={{ mb: 1, mt: 1 }}>
                  Contacto
                </Typography>
                <Typography>{client.email}</Typography>
                <Typography>{client.cellphone_number}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate("/client-edit")}
                  size="small"
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  color="error"
                  onClick={() => showDialog(client.rut)}
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          )}
        </Box>
      </Container>
    </Layout>
  );
};
