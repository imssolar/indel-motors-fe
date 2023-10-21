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
import { Navigate, useNavigate } from "react-router-dom";
import { ClientCreate } from "../../types/client";
import { useContext, useEffect } from "react";
import { ClientContext } from "../../context/Client/ClientContext";
import Swal from "sweetalert2";

interface IFormInput {
  rut: string;
}

export const FindClient = () => {
  const { handleSubmit, register } = useForm<IFormInput>();

  const { client, findCLient, clearClientFinder } = useContext(ClientContext);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    findCLient(formData.rut);
    console.log(formData);
  };

  useEffect(() => {
    clearClientFinder();
  }, []);
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
                <Button size="small">Eliminar</Button>
              </CardActions>
            </Card>
          )}
        </Box>
      </Container>
    </Layout>
  );
};
