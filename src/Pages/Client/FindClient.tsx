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

  const { client, message, findCLient, clearClientFinder, changeStatusClient } =
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
    if (message) {
      Swal.fire({
        title: "No encontrado",
        text: `${message}`,
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
  }, [message]);

  const showDialog = (clientRut: string, clientStatus: boolean) => {
    Swal.fire({
      title: `${clientStatus ? "Deshabilitar" : "Habilitar"} Cliente`,
      text: `${message}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `¿Desea ${clientStatus ? "deshabilitar":"habilitar"} al cliente?`,
    }).then((result) => {
      if (result.isConfirmed) {
        clearClientFinder();
        changeStatusClient(clientRut);
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
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Cliente
                </Typography>
                <Typography variant="h5" component="div">
                  {client.rut}
                </Typography>
                <Typography variant="h5" component="div">
                  {client.names}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => navigate("/client-edit")} size="small">
                  Editar
                </Button>
                <Button
                  size="small"
                  onClick={() => showDialog(client.rut, client.status)}
                >
                  {client.status ? "Deshabilitar" : "Habilitar"}
                </Button>
              </CardActions>
            </Card>
          )}
        </Box>
      </Container>
    </Layout>
  );
};
