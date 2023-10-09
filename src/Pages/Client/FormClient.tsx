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
import { useState } from "react";

interface IFormInput {
  rut: string;
  // names: string;
  // surnames: string;
  // phone: string;
  // address: string;
  // district: string;
  // email: string;
}
export const FormClient = () => {


  const [district,setDistrict] = useState('')

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver:yupResolver(clientSchema)
  });

  const handleDistrictChange=(event:SelectChangeEvent)=>{
    setDistrict(event.target.value)
  }

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    console.log(formData)
  };

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
                name="rut"
              />
              {errors.rut && (
              <MessageAlert messageToShow={errors.rut.message} />
            )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="names"
                label="Nombres"
                name="names"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="surnames"
                label="Apellidos"
                name="surnames"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Télefono contacto"
                name="phone"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                name="address"
                label="Dirección"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Select
                  labelId="district-label"
                  id="district"
                  placeholder="Comuna*"
                  defaultValue={"Santiago"}
                  value={district}
                  onChange={handleDistrictChange}
                >
                  <MenuItem>Maipú</MenuItem>
                  <MenuItem>Talagante</MenuItem>
                  <MenuItem>Cerrillos</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Correo"
                type="email"
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
