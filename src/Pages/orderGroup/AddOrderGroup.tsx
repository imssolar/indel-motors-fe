import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Layout } from "../../components/Layout/Layout";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { OrderGroupContext } from "../../context/orderGroup/orderGroupContext";

interface IFormInput {
  name: string;
}

export const AddOrderGroup = () => {
  const { handleSubmit, register } = useForm<IFormInput>();

  const { addOrderGroup } = useContext(OrderGroupContext);

  const onSubmit: SubmitHandler<IFormInput> = (formData) => {
	console.log(formData)
    addOrderGroup(formData);
  };

  return (
    <Layout>
      <Container component={"main"} maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography>Tipo de orden de trabajo</Typography>
          <Box
            component={"form"}
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  {...register("name")}
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
