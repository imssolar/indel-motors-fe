import { SubmitHandler, useForm } from "react-hook-form";
import { Layout } from "../../components/Layout/Layout";
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

import { useContext, useEffect, useState } from "react";
import { VehicleContext } from "../../context/Vehicle/VehicleContext";
import Swal from "sweetalert2";
import { yupResolver } from "@hookform/resolvers/yup";
import { vehicleSchema } from "../../schemas/vehicleSchema";

interface IFormVehicle {
  license_plate: string;
  brand: string;
  model: string;
  year_production: number;
  rut_client: string;
  vin_number: string;
}

export const AddVehicle = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IFormVehicle>({
    resolver: yupResolver(vehicleSchema),
  });

  const [modifyVehicle, setModifyVehicle] = useState<Boolean>(false);

  const {
    vehicle,
    message,
    addVehicle,
    getVehicle,
    updateVehicle,
    deleteVehicle,
    
  } = useContext(VehicleContext);
  const licenseForm = watch("license_plate") ?? "";
  const brandForm = watch("brand") ?? "";
  const modelForm = watch("model") ?? "";
  const rutForm = watch("rut_client") ?? "";
  const yearform = watch("year_production") ?? "";
  const vinNumberForm = watch("vin_number") ?? "";

  useEffect(() => {
    if (licenseForm.length >= 6) {
      getVehicle(licenseForm);
    }
  }, [licenseForm]);

  useEffect(() => {
    setValue("brand", vehicle?.brand ?? "");
    setValue("model", vehicle?.model ?? "");
    setValue("year_production", vehicle?.year_production ?? 2023);
    setValue("vin_number", vehicle?.vin_number ?? "");
    setValue("rut_client", vehicle?.client?.rut ?? "");
  }, [vehicle]);

  const onSubmit: SubmitHandler<IFormVehicle> = async (formDataVehicle) => {
    console.log(formDataVehicle);
  };

  const saveVehicle = () => {
    const obj = {
      license_plate: licenseForm,
      brand: brandForm,
      model: modelForm,
      year_production: yearform,
      vin_number: vinNumberForm,
      rut_client: rutForm,
    };
    if (modifyVehicle) {
      updateVehicle(obj);
      setModifyVehicle(false);
    } else {
      addVehicle(obj);
    }

    // cleanForm();
  };

  const cleanForm = () => {
    if (message.type === "error") {
      setValue("rut_client", "");
      return;
    }
    setValue("rut_client", "");
    setValue("brand", "");
    setValue("model", "");
    setValue("year_production", 2023);
    setValue("vin_number", "");
    setValue("license_plate", "");
  };

  const deleteVehicleByLicense = () => {
    Swal.fire({
      title: "Eliminar Vehículo",
      text: "Confirme la eliminación del vehículo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVehicle(licenseForm);
      }
      cleanForm();
    });
  };

  useEffect(() => {
    if (message.text && message.type === "error") {
      Swal.fire({
        icon: "error",
        title: "Ooops!",
        text: `${message.text}`,
      }).then(()=>{
        cleanForm()
      });
    }
    if (message.text && message.type === "info") {
      Swal.fire({
        icon: "success",
        title: "Buen trabajo!",
        text: `${message.text}`,
      }).then(()=>{
        cleanForm()
      })
    }
  }, [message.text || message.type]);

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
              INGRESO DE VEHICULOS
            </Typography>
            <Box
              component={"form"}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography sx={{ mb: 2, fontWeight: "bold" }}>
                DATOS DEL VEHÍCULO
              </Typography>
              <Grid container spacing={3} columnSpacing={3}>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    id="license_vehicle"
                    label="Patente"
                    inputProps={{ readOnly: modifyVehicle }}
                    sx={{ opacity: modifyVehicle ? 0.5 : 1 }}
                    {...register("license_plate")}
                  />
                  {errors.license_plate && (
                    <p>{errors.license_plate.message}</p>
                  )}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    {...register("brand")}
                    required
                    fullWidth
                    id="brand"
                    label={"Marca"}
                    inputProps={{
                      readOnly: vehicle !== null && !modifyVehicle,
                    }}
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      opacity: vehicle !== null && !modifyVehicle ? 0.85 : 1,
                    }}
                  />
                  {/* {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )} */}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    id="brand"
                    label={yearform ? "" : "Año Fabricación"}
                    inputProps={{
                      readOnly: vehicle !== null && !modifyVehicle,
                    }}
                    sx={{
                      opacity: vehicle !== null && !modifyVehicle ? 0.5 : 1,
                    }}
                    {...register("year_production")}
                  />
                  {/* {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )} */}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    id="model"
                    inputProps={{
                      readOnly: vehicle !== null && !modifyVehicle,
                    }}
                    sx={{
                      opacity: vehicle !== null && !modifyVehicle ? 0.5 : 1,
                    }}
                    label={modelForm?.length > 0 ? "" : "Modelo"}
                    {...register("model")}
                  />
                  {/* {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )} */}
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    required
                    fullWidth
                    id="model"
                    inputProps={{
                      readOnly: vehicle !== null && !modifyVehicle,
                    }}
                    sx={{
                      opacity: vehicle !== null && !modifyVehicle ? 0.5 : 1,
                    }}
                    label={vinNumberForm?.length > 0 ? "" : "N° de Chasis"}
                    {...register("vin_number")}
                  />
                  {/* {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )} */}
                </Grid>
              </Grid>
              <Typography sx={{ mb: 2, mt: 2, fontWeight: "bold" }}>
                DATOS DEL CLIENTE
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="rut_client"
                    inputProps={{ readOnly: vehicle !== null }}
                    sx={{ opacity: vehicle !== null ? 0.5 : 1 }}
                    label={rutForm.length > 0 ? "" : "RUT ASOCIADO"}
                    {...register("rut_client")}
                  />
                  {/* {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )} */}
                </Grid>
              </Grid>
            </Box>

            <Stack sx={{ mt: 5 }} direction="row" spacing={2}>
              <Button variant="contained" onClick={saveVehicle}>
                GUARDAR
              </Button>
              {/* <Button variant="contained">Buscar</Button> */}
              <Button
                variant="contained"
                onClick={() => setModifyVehicle(true)}
              >
                MODIFICAR
              </Button>
              <Button variant="contained" onClick={deleteVehicleByLicense}>
                ELIMINAR
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};
