import {
  Box,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Layout } from "../../components/Layout/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { brands } from "../../data/brands";
import { VehicleContext } from "../../context/Vehicle/VehicleContext";

interface IVehicleInput {
  license_plate: string;
  brand: string;
  model: string;
  year_production: number;
  vin_number: number;
  rut_client: string;
}
export const AddVehicle = () => {
  const [brandSelect, setBrand] = useState("");
  const { handleSubmit, register } = useForm<IVehicleInput>();
  const {addVehicle} = useContext(VehicleContext)

  const handleChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value as string);
  };

  const onSubmit: SubmitHandler<IVehicleInput> = async (formData) => {
    console.log(formData);
    addVehicle(formData)
  };

  return (
    <Layout>
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
            Crear Vehículo
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
                  id="licence_plate"
                  label="Patente"
                  {...register("license_plate")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="rut"
                  label="Rut asociado"
                  {...register("rut_client")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="brand"
                  label="Marca"
                  {...register("brand")}
                />
              </Grid>
              {/* <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Marcas</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={brandSelect}
                    label="Marca"
                    {...register("brand")}
                    onChange={handleChange}
                  >
                    {brands.map((brand) => (
                      <MenuItem value={brand}>FORD</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid> */}

              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="model"
                  label="Modelo"
                  {...register("model")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="year_production"
                  label="Año de Fabricación"
                  {...register("year_production")}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="vin_number"
                  label="Número de Chasis"
                  {...register("vin_number")}
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};
