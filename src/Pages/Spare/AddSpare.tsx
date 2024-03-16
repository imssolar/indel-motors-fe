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
  Autocomplete,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import { UnitContext } from "../../context/Unit/UnitContext";
import { spareGroupContext } from "../../context/SpareGroup/spareGroupContext";

interface IFormInputSpare {
  name: number;
  cost: number;
  stock: number;
  unit_id: number;
  sparegroup_id: number;
  code_id: string;
}

export const AddSpare = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<IFormInputSpare>({
    // resolver: yupResolver(clientSchema),
  });

  const onSubmit: SubmitHandler<IFormInputSpare> = async (
    formData: IFormInputSpare
  ): Promise<void> => {
    console.log(formData);
    // addClient(formData)
  };

  const nameForm = watch("name");
  const costForm = watch("cost");
  const stockForm = watch("stock");
  const codeForm = watch("code_id");
  const unitForm = watch("unit_id");
  const spareGroupForn = watch("sparegroup_id");

  const { units, getUnits } = useContext(UnitContext);
  const { spareGroups,getSpareGroups } = useContext(spareGroupContext);

  //   useEffect(() => {
  //     if (message.text && message.type === "error") {
  //       console.log("type error");
  //       Swal.fire({
  //         icon: "error",
  //         title: "Ooops!",
  //         text: `${message.text}`,
  //       });
  //     }
  //     if (message.text && message.type === "info") {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Buen trabajo!",
  //         text: `${message.text}`,
  //       });
  //     }
  //   }, [message.text || message.type]);

  useEffect(() => {
    getUnits();
    getSpareGroups();
  }, []);

  const unitsMap = units?.map((unit) => {
    console.log(unit);
    return {
      label: unit.name_unit,
      value: unit.id,
    };
  });
  console.log(unitsMap);

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
          <CardContent sx={{ m: 5 }}>
            <Typography
              component={"h1"}
              variant="h5"
              sx={{ display: "flex", justifyContent: "center", mb: 5 }}
            >
              INGRESO DE REPUESTOS
            </Typography>
            <Box
              component={"form"}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography sx={{ mb: 2, fontWeight: "bold" }}>
                DATOS DEL REPUESTO
              </Typography>
              <Grid container spacing={5} columnSpacing={4}>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Nombre"
                    InputLabelProps={{ shrink: true }}
                    // inputProps={{ readOnly: modifyClient }}
                    // sx={{ opacity: modifyClient ? 0.5 : 1 }}
                    {...register("name")}
                  />
                  {/* {errors.rut && <p>{errors.rut.message}</p>} */}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="cost"
                    label={"Costo"}
                    InputLabelProps={{ shrink: true }}
                    // label={namesForm?.length > 0 ? "" : "NOMBRES"}
                    // inputProps={{
                    //   readOnly: client !== null && !modifyClient,
                    // }}
                    // sx={{
                    //   opacity: client !== null && !modifyClient ? 0.5 : 1,
                    // }}
                    {...register("cost")}
                  />
                  {/* {errors.license_vehicle && (
						  <p>{errors.license_vehicle.message}</p>
						)} */}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="stock"
                    label={"Stock"}
                    InputLabelProps={{ shrink: true }}
                    // label={surnamesForm?.length > 0 ? "" : "APELLIDOS"}
                    // inputProps={{
                    //   readOnly: client !== null && !modifyClient,
                    // }}
                    // sx={{
                    //   opacity: client !== null && !modifyClient ? 0.5 : 1,
                    // }}
                    {...register("stock")}
                  />
                  {/* {errors.license_vehicle && (
						  <p>{errors.license_vehicle.message}</p>
						)} */}
                </Grid>
              </Grid>
              <Grid container spacing={3} mt={2}>
                <Grid item xs={4}>
                  <Autocomplete
                    id="free-solo"
                    // value={item.code}
                    freeSolo
                    options={unitsMap}
                    renderInput={(params) => (
                      <TextField {...params} label="Código Repuesto" />
                    )}
                    sx={{ width: 200 }}
                    {...register("unit_id")}
                  />
                </Grid>
                <Grid item xs={4}>
                  {unitsMap && (
                    <Autocomplete
                      id="free-solo"
                      // value={item.code}
                      freeSolo
                      options={unitsMap}
                      renderInput={(params) => (
                        <TextField {...params} label="Tipo de unidad" />
                      )}
                      sx={{ width: 200 }}
                      {...register("code_id")}
                    />
                  )}
                </Grid>
                <Grid item xs={4}>
                  <Autocomplete
                    id="free-solo"
                    // value={item.code}
                    freeSolo
                    options={unitsMap.map((option) => option.label)}
                    renderInput={(params) => (
                      <TextField {...params} label="Grupo de repuesto" />
                    )}
                    sx={{ width: 200 }}
                    {...register("sparegroup_id")}
                  />
                </Grid>
              </Grid>
            </Box>

            <Stack sx={{ mt: 8 }} direction="row" spacing={2}>
              <Button variant="contained">GUARDAR</Button>
              <Button variant="contained">Buscar</Button>
              <Button variant="contained">MODIFICAR</Button>
              <Button variant="contained">ELIMINAR</Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};
