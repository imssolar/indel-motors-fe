import { useForm } from "react-hook-form";
import { Layout } from "../../components/Layout/Layout";
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
  MenuItem,
  SelectChangeEvent,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Select,
  Stack,
  Autocomplete,
} from "@mui/material";
import { RequestWO, ResponseOTByPPU } from "../../types/workorder";
import { useContext, useEffect } from "react";
import { WorkOrderContext } from "../../context/workOrder/WorkOrderContext";
import { SpareContext } from "../../context/Spare/SpareContext";
const headers = [
  "PPU",
  "N° OT/COTIZACIÓN",
  "FECHA(DD/MM/AA)",
  "OBS. DE REPARACIÓN",
  "TIPO OT",
];

const rows = [
  {
    ppu: "CV-12-23",
    ot: "12345",
    fecha: "22-03-23",
    obs: "Cambio de polea",
    tipo: "Preventiva",
  },
];

export const WO = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RequestWO>();

  const { vehicle, client, otByPPU, getClientByPPU, getWorkOrderByPPU } =
    useContext(WorkOrderContext);

  const { spare, allSpares, getSpare, getSpares } = useContext(SpareContext);
  const licenceForm = watch("license_vehicle") ?? "";
  const brandForm = watch("brand") ?? "";
  const modelForm = watch("model") ?? "";
  const rutForm = watch("rut") ?? "";
  const namesForm = watch("names") ?? "";
  const surnamesForm = watch("surnames") ?? "";

  const handleChangeSpares = (spareSelectd: string) => {
    getSpare(spareSelectd);
  };

  useEffect(() => {
    if (licenceForm.length >= 6) {
      getClientByPPU(licenceForm);
      getWorkOrderByPPU(licenceForm);
    }
  }, [licenceForm]);

  useEffect(() => {
    setValue("brand", vehicle?.brand ?? "");
    setValue("model", vehicle?.model ?? "");
    setValue("names", client?.names ?? "");
    setValue("surnames", client?.surnames ?? "");
    setValue("rut", client?.rut ?? "");
  }, [vehicle]);

  useEffect(() => {
    getSpares();
  }, []);

  const top100Films = [
    { title: "The Shawshank Redemption", cod_id: 2 },
    { title: "The Godfather", cod_id: 3 },
    { title: "The Godfather: Part II", cod_id: 4 },
  ];

  return (
    <Layout>
      <Container
        component={"main"}
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "",
        }}
      >
        <CssBaseline />
        <Card>
          <CardContent sx={{ m: 4 }}>
            <Typography
              component={"h1"}
              variant="h5"
              sx={{ display: "flex", justifyContent: "center", mb: 5 }}
            >
              MODULO OT
            </Typography>
            <Box component={"form"} noValidate>
              <Typography sx={{ mb: 2, fontWeight: "bold" }}>
                DATOS DEL VEHÍCULO
              </Typography>
              <Grid container spacing={3} columnSpacing={3}>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="license_vehicle"
                    label="Patente"
                    {...register("license_vehicle")}
                  />
                  {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="brand"
                    label={brandForm?.length > 0 ? "" : "Marca"}
                    inputProps={{ readOnly: true }}
                    sx={{ opacity: "0.5" }}
                    {...register("brand")}
                  />
                  {/* {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )} */}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="model"
                    inputProps={{ readOnly: true }}
                    sx={{ opacity: "0.5" }}
                    label={modelForm?.length > 0 ? "" : "Modelo"}
                    {...register("model")}
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
                    id="names"
                    label={namesForm.length > 0 ? "" : "Nombres"}
                    {...register("names")}
                  />
                  {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="surnames"
                    label={surnamesForm.length > 0 ? "" : "Apellido(s)"}
                    {...register("surnames")}
                  />
                  {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="rut"
                    label={rutForm.length > 0 ? "" : "RUT"}
                    {...register("rut")}
                  />
                  {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Typography sx={{ mt: 2, fontWeight: "bold" }}>
              HISTORIAL
            </Typography>
            <TableContainer sx={{ mt: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map((header, headerID) => (
                      <TableCell key={headerID}>{header}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                {otByPPU && (
                  <TableBody>
                    {otByPPU.map((workOrderField: ResponseOTByPPU) => (
                      <TableRow
                        key={workOrderField.ot_number}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {workOrderField.license_vehicle}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {workOrderField.ot_number}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {workOrderField.createdAt}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {workOrderField.observations}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {workOrderField.ot_type}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <Typography sx={{ mt: 3, mb: 5, fontWeight: "bold" }}>
              ORDEN DE TRABAJO
            </Typography>
            <Stack direction="row" spacing={2}>
              <Autocomplete
                id="free-solo"
                freeSolo
                options={top100Films.map((option) => option.cod_id)}
                renderInput={(params) => (
                  <TextField {...params} label="Código" />
                )}
                sx={{ width: 200 }}
                onChange={(event, value) => handleChangeSpares(String(value))}
              />
              <TextField label="Insumo/Repuesto" value={spare ? spare.name :  ""} />
              <TextField
                label="Unidades en stock"
                value={spare ? spare.stock : ""}
              />
              <TextField label="Cantidad" />
              <TextField label="Valor" value={spare ? spare.cost : ""} />
              <TextField label="Total" />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};
