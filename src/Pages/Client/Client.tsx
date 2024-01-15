import {
  Box,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { clientSchema } from "../../schemas/clientSchema";
import { useContext, useEffect, useState } from "react";
import { ClientContext } from "../../context/Client/ClientContext";
import { Layout } from "../../components/Layout/Layout";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";

interface IFormInput {
  rut: string;
  names: string;
  surnames: string;
  cellphone_number: string;
  address: string;
  district: string;
  email: string;
}

export const Client = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(clientSchema),
  });

  const { client, message, addClient, findCLient, getClients, editClient, deleteClient } =
    useContext(ClientContext);
  const rutForm = watch("rut") ?? "";
  const namesForm = watch("names") ?? "";
  const surnamesForm = watch("surnames") ?? "";
  const cellphoneForm = watch("cellphone_number") ?? "";
  const addressform = watch("address") ?? "";
  const districtForm = watch("district") ?? "";
  const emailForm = watch("email") ?? "";

  const [modifyClient, setModifyClient] = useState<Boolean>(false);

  useEffect(() => {
    setValue("names", client?.names ?? "");
    setValue("surnames", client?.surnames ?? "");
    setValue("cellphone_number", client?.cellphone_number ?? "9XXXXXXXX");
    setValue("address", client?.address ?? "");
    setValue("district", client?.district ?? "");
    setValue("email", client?.email ?? "");
  }, [client]);

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    console.log(formData);
    addClient(formData);
  };

  useEffect(() => {
    getClients();
  }, []);

  useEffect(() => {
    if (message.text && message.type === "error") {
      console.log("type error");
      Swal.fire({
        icon: "error",
        title: "Ooops!",
        text: `${message.text}`,
      });
    }
    if (message.text && message.type === "info") {
      Swal.fire({
        icon: "success",
        title: "Buen trabajo!",
        text: `${message.text}`,
      });
    }
  }, [message.text || message.type]);

  const deleteClientByRut = () => {
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
		deleteClient(rutForm)
      }
    });
    cleanForm();
  };

  const saveCLient = () => {
    const obj = {
      rut: rutForm,
      names: namesForm,
      surnames: surnamesForm,
      cellphone_number: cellphoneForm,
      address: addressform,
      district: districtForm,
      email: emailForm,
    };
    if (modifyClient) {
      editClient(obj);
      setModifyClient(false);
    } else {
      addClient(obj);
    }

    cleanForm();
  };

  const findClientByRut = () => {
    findCLient(rutForm);
  };

 

  const cleanForm = () => {
    setValue("rut", "");
    setValue("names", "");
    setValue("surnames", "");
    setValue("cellphone_number", "");
    setValue("address", "");
    setValue("district", "");
    setValue("email", "");
  };

  return (
    <Layout>
      <Container
        component={"main"}
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Card sx={{ boxShadow: 2 }}>
          <CardContent sx={{ m: 4 }}>
            <Typography
              component={"h1"}
              variant="h5"
              sx={{ display: "flex", justifyContent: "center", mb: 5 }}
            >
              INGRESO DE CLIENTES
            </Typography>
            <Box
              component={"form"}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography sx={{ mb: 2, fontWeight: "bold" }}>
                DATOS DEL CLIENTE
              </Typography>
              <Grid container spacing={3} columnSpacing={3}>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    id="rut"
                    label="RUT"
                    inputProps={{ readOnly: modifyClient }}
                    sx={{ opacity: modifyClient ? 0.5 : 1 }}
                    {...register("rut")}
                  />
                  {errors.rut && <p>{errors.rut.message}</p>}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    id="names"
                    label={namesForm?.length > 0 ? "" : "NOMBRES"}
                    inputProps={{
                      readOnly: client !== null && !modifyClient,
                    }}
                    sx={{
                      opacity: client !== null && !modifyClient ? 0.5 : 1,
                    }}
                    {...register("names")}
                  />
                  {/* {errors.license_vehicle && (
					  <p>{errors.license_vehicle.message}</p>
					)} */}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="brand"
                    label={surnamesForm?.length > 0 ? "" : "APELLIDOS"}
                    inputProps={{
                      readOnly: client !== null && !modifyClient,
                    }}
                    sx={{
                      opacity: client !== null && !modifyClient ? 0.5 : 1,
                    }}
                    {...register("surnames")}
                  />
                  {/* {errors.license_vehicle && (
					  <p>{errors.license_vehicle.message}</p>
					)} */}
                </Grid>
              </Grid>
              <Typography sx={{ mb: 2, mt: 2, fontWeight: "bold" }}>
                CONTACTO
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    id="cellphone_number"
                    inputProps={{
						readOnly: client !== null && !modifyClient,
					  }}
                    sx={{ opacity: client !== null && !modifyClient ? 0.5 : 1 }}
                    label={cellphoneForm.length > 0 ? "" : "TELÉFONO"}
                    {...register("cellphone_number")}
                  />
                  {/* {errors.license_vehicle && (
					  <p>{errors.license_vehicle.message}</p>
					)} */}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    inputProps={{
						readOnly: client !== null && !modifyClient,
					  }}
                    sx={{ opacity: client !== null && !modifyClient ? 0.5 : 1 }}
                    label={addressform.length > 0 ? "" : "DIRECCIÓN"}
                    {...register("address")}
                  />
                  {/* {errors.license_vehicle && (
					  <p>{errors.license_vehicle.message}</p>
					)} */}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    id="district"
                    inputProps={{
						readOnly: client !== null && !modifyClient,
					  }}
                    sx={{ opacity: client !== null && !modifyClient ? 0.5 : 1 }}
                    label={districtForm.length > 0 ? "" : "COMUNA"}
                    {...register("district")}
                  />
                  {/* {errors.license_vehicle && (
					  <p>{errors.license_vehicle.message}</p>
					)} */}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    inputProps={{
						readOnly: client !== null && !modifyClient,
					  }}
                    sx={{ opacity: client !== null && !modifyClient ? 0.5 : 1 }}
                    label={emailForm.length > 0 ? "" : "CORREO"}
                    {...register("email")}
                  />
                  {/* {errors.license_vehicle && (
					  <p>{errors.license_vehicle.message}</p>
					)} */}
                </Grid>
              </Grid>
            </Box>

            <Stack sx={{ mt: 5 }} direction="row" spacing={2}>
              <Button variant="contained" onClick={saveCLient}>
                GUARDAR
              </Button>
              <Button variant="contained" onClick={findClientByRut}>
                Buscar
              </Button>
              <Button variant="contained" onClick={() => setModifyClient(true)}>
                MODIFICAR
              </Button>
              <Button variant="contained" onClick={deleteClientByRut}>
                ELIMINAR
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};
