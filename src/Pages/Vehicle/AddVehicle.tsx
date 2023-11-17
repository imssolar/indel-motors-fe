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
import { useContext, useEffect, useState } from "react";
import { VehicleContext } from "../../context/Vehicle/VehicleContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateRut } from "../../Helpers/ValidateRut";

interface IVehicleInput {
  license_plate: string;
  brand: string;
  model: string;
  year_production: number;
  vin_number: number;
  rut_client: string;
}

const schema = yup.object({
  license_plate: yup.string().required("El nombre es obligatorio"),
  brand: yup.string().required("El brand es obligatorio"),
  model: yup.string().required("El model es obligatorio"),
  year_production: yup.number().required("El year_production es obligatorio"),
  vin_number: yup.number().required("El vin_number es obligatorio"),
  rut_client: yup
    .string()
    .required("El rut_client es obligatorio")
    .test("name", "El Rut ingresado no es válido", (value) => {
      console.log(value)
      // if (value.length >= 8) return validateRut(value);
      // console.log(value)
      // return false
    
    }),

});

export const AddVehicle = () => {
  const [brandSelect, setBrand] = useState("");
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IVehicleInput>({ resolver: yupResolver(schema) });
  const { brands, addVehicle, getBrands } = useContext(VehicleContext);

  const handleChange = (event: SelectChangeEvent) => {
    setBrand(event.target.value as string);
  };

  const onSubmit: SubmitHandler<IVehicleInput> = async (formData) => {
    console.log(formData);
    addVehicle(formData);
  };

  useEffect(() => {
    getBrands();
  }, []);

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
                {errors.license_plate && <p>{errors.license_plate.message}</p>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="rut"
                  label="Rut asociado"
                  {...register("rut_client")}
                />
                {/* {errors.rut_client && <p>{errors.rut_client.message}</p>} */}

              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Marca</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={brandSelect}
                    label="Marca"
                    {...register("brand")}
                    onChange={handleChange}
                  >
                    {brands.map((brands) => (
                      <MenuItem key={brands.id} value={brands.name}>
                        {brands.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

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
