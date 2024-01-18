import { useForm, SubmitHandler } from "react-hook-form";
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
import {
  RequestArraySpare,
  RequestTest,
  RequestWO,
  ResponseOTByPPU,
} from "../../types/workorder";
import { useContext, useEffect, useState } from "react";
import { WorkOrderContext } from "../../context/workOrder/WorkOrderContext";
import { SpareContext } from "../../context/Spare/spareContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { OrderGroupContext } from "../../context/orderGroup/OrderGroupContext";
const headers = [
  "PPU",
  "N° OT/COTIZACIÓN",
  "FECHA(DD/MM/AA)",
  "OBS. DE REPARACIÓN",
  "TIPO OT",
];

export const WO = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RequestTest>();

  const { vehicle, client, otByPPU, getClientByPPU, getWorkOrderByPPU } =
    useContext(WorkOrderContext);

  const [modifyWO, setModifyWO] = useState<boolean>(false);

  const {
    spare,
    allSpares,
    requestSpares,
    setRequestSpares,
    handleQuantity,
    AddnewArrayOfSpare,
    getSpares,
    deleteSpare,
  } = useContext(SpareContext);

  const { orderGroup, getOrderGroups } = useContext(OrderGroupContext);
  // const [requestSpares, setRequestSpares] = useState<RequestArraySpare[]>([
  //   { id: 0, stock: 0, quantity: 0, name: "", code: "", total: 0, value: 0 },
  // ]);
  const licenceForm = watch("license_vehicle") ?? "";
  const brandForm = watch("brand") ?? "";
  const modelForm = watch("model") ?? "";
  const rutForm = watch("rut") ?? "";
  const namesForm = watch("names") ?? "";
  const surnamesForm = watch("surnames") ?? "";
  const observationForm = watch("observations") ?? "";
  const otTypeForm = watch("ot_type") ?? "";

  const handleChangeSpares = (spareSelectd: string, id: number) => {
    // getSpare(spareSelectd);
    // const requestSparesFormatted = requestSpares.map((item, index) => {
    //   if (index === id) {
    //     return {
    //       ...item,
    //       code: spare?.code_id ?? "",
    //       stock: spare?.stock ?? 0,
    //       name: spare?.name ?? "",
    //       value: spare?.cost ?? 0,
    //     };
    //   }
    //   return item;
    // });
    setRequestSpares(spareSelectd, id);
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
    getOrderGroups();
  }, []);

  const AddNewSpare = () => {
    const newSpare = {
      id: 0,
      stock: 0,
      quantity: 0,
      name: "",
      code: "",
      total: 0,
      value: 0,
    };
    AddnewArrayOfSpare(newSpare);
  };

  const saveWO = () => {
    const values = getValues();
    const woToSave = {
      license_vehicle: values.license_vehicle,
      observations: values.observations,
      spares: requestSpares.map((spare) => ({
        id: spare.code,
        stock: spare.quantity,
      })),
      ot_type: values.ot_type,
    };
    console.log(woToSave);
    console.log(values);
    //validar que llega cuando se le da submit
    //utilizar el método getValues() de react-hook-form para ver los datos
  };

  const findWO = () => {
    getClientByPPU(licenceForm);
  };

  const deleteWOByLicence = () => {};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    stock: number
  ) => {
    if (Number(e.target.value) > stock) {
      return;
    }
    handleQuantity(Number(e.target.value), index);
  };

  /**
   *
   *
   */

  const handleChangeOtType = (ot: string, event: any) => {
    setValue("ot_type", ot.split("-")[0]);
    console.log(ot.split("-")[0]);
    console.log(event);
  };
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
            <Box component={"form"} noValidate onSubmit={handleSubmit(saveWO)}>
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
                    // {...register("brand")}
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
                    // {...register("model")}
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
                    inputProps={{
                      readOnly: client !== null && !modifyWO,
                    }}
                    sx={{
                      opacity: client !== null && !modifyWO ? 0.5 : 1,
                    }}
                    // {...register("names")}
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
                    inputProps={{
                      readOnly: client !== null && !modifyWO,
                    }}
                    sx={{
                      opacity: client !== null && !modifyWO ? 0.5 : 1,
                    }}
                    // {...register("surnames")}
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
                    inputProps={{
                      readOnly: client !== null && !modifyWO,
                    }}
                    sx={{
                      opacity: client !== null && !modifyWO ? 0.5 : 1,
                    }}
                    // {...register("rut")}
                  />
                  {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )}
                </Grid>
              </Grid>
            </Box>
            <Grid container mt={2} spacing={3} columnSpacing={3}>
              <Grid item xs={4}>
                <Autocomplete
                  id="ot_type"
                  {...register("ot_type")}
                  freeSolo
                  fullWidth
                  options={orderGroup.map(
                    (option) => `${option.id}-${option.name}`
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Código" />
                  )}
                  onChange={(event, value) =>
                    handleChangeOtType(value ?? "", event)
                  }
                />
              </Grid>
              <Grid item xs={8} pl={2}>
                <TextField
                  {...register("observations")}
                  fullWidth
                  multiline
                  rows={3}
                  label="Observaciones"
                />
              </Grid>
            </Grid>
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
            <Grid
              container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Grid item>
                <Typography sx={{ mt: 3, mb: 5, fontWeight: "bold" }}>
                  ORDEN DE TRABAJO
                </Typography>
              </Grid>
              <Grid item>
                <Button onClick={() => AddNewSpare()} variant="contained">
                  +
                </Button>
              </Grid>
            </Grid>
            {requestSpares.map((item, index) => {
              return (
                <Stack direction="row" spacing={2} marginTop={2}>
                  <Autocomplete
                    id="free-solo"
                    value={item.code}
                    freeSolo
                    options={allSpares.map((option) => option.code_id)}
                    renderInput={(params) => (
                      <TextField {...params} label="Código" />
                    )}
                    sx={{ width: 200 }}
                    onChange={(event, value) =>
                      handleChangeSpares(String(value), index)
                    }
                  />
                  <TextField label="Insumo/Repuesto" value={item.name} />
                  <TextField label="Unidades en stock" value={item.stock} />
                  <TextField
                    id={`quantity-${index}`}
                    label="Cantidad"
                    name={`quantity-${index}`}
                    value={item.quantity}
                    onChange={(event) => handleChange(event, index, item.stock)}
                  />
                  <TextField label="Valor" value={item.value} />
                  <TextField label="Total" value={item.total} />
                  <Button
                    onClick={() => deleteSpare(index)}
                    disabled={requestSpares.length === 1}
                  >
                    <DeleteForeverIcon />
                  </Button>
                </Stack>
              );
            })}
            <Stack sx={{ mt: 5 }} direction="row" spacing={2}>
              <Button variant="contained" onClick={saveWO}>
                GUARDAR
              </Button>
              <Button variant="contained" onClick={findWO}>
                Buscar
              </Button>
              <Button variant="contained" onClick={() => setModifyWO(true)}>
                MODIFICAR
              </Button>
              <Button variant="contained" onClick={deleteWOByLicence}>
                ELIMINAR
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};
