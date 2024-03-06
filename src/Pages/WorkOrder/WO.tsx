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
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { RequestTest, ResponseOTByPPU } from "../../types/workorder";
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
  "Editar",
];

export const WO = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RequestTest>();

  const {
    vehicle,
    client,
    otByPPU,
    workorder,
    generateQuotationRequest,
    generateQuationStatus,
    getClientByPPU,
    getWorkOrderByPPU,
    getWorkOrderByOTNumber,
    updateWO
  } = useContext(WorkOrderContext);

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
    setRequestSpareEdit,
  } = useContext(SpareContext);

  const { orderGroup, getOrderGroups } = useContext(OrderGroupContext);

  const licenceForm = watch("license_vehicle") ?? "";
  const brandForm = watch("brand") ?? "";
  const modelForm = watch("model") ?? "";
  const rutForm = watch("rut") ?? "";
  const namesForm = watch("names") ?? "";
  const surnamesForm = watch("surnames") ?? "";
  const observations = watch("observations") ?? "";
  const otType = watch("ot_type") ?? "";

  const [isConfirmedOT, setIsConfirmedOT] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

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

  //Crear una nueva función que se ejecuta en el useEffect de editar que se llame setRequestSparesEdit y le pase el array de spare que se obtiene desde el context
  //Con este array ir a mapear los spareRequest. Crear un caso en el reducer para que a la variable requestSpare se le pase estos nuevos valores (esto esta en el contexto de Spare)

  useEffect(() => {
    if (workorder) {
      setRequestSpareEdit(workorder?.spares, workorder.workOrder.spares_stock);
    }
  }, [workorder?.spares]);

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

  const calculateNewStock = () => {
    return requestSpares.map((res) => {
      const findId = workorder?.workOrder?.spares_stock?.find(
        (item) => item.id === res.code
      );
      console.log(findId);
      return {
        id: findId?.id,
        stock: findId?.stock ? res.quantity - findId?.stock : res.quantity,
      };
    });
  };

  const generateQuotation = () => {
    const values = getValues();
    const woToSave = {
      license_vehicle: values.license_vehicle,
      observations: values.observations,
      spares: modifyWO
        ? calculateNewStock()
        : requestSpares.map((spare) => ({
            id: spare.code,
            stock: spare.quantity,
          })),
      ot_type: Number(values.ot_type),
      is_confirmed: isConfirmedOT,
      is_payment: isPaymentConfirmed,
    };
    console.log(woToSave);
    if (modifyWO && workorder) {
      updateWO(workorder?.workOrder.ot_number, woToSave);
      setModifyWO(false)
      return
    }
    generateQuotationRequest(woToSave);
  };

  const editOT = (ot_number: number) => {
    setModifyWO(true);
    getWorkOrderByOTNumber(ot_number);
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

  const handleChangeOtType = (ot: string, event: any) => {
    setValue("ot_type", ot.split("-")[0]);
    console.log(ot.split("-")[0]);
    console.log(event);
  };

  useEffect(() => {
    if (workorder) {
      const values = getValues();
      console.log(workorder);
      reset({
        ...values,
        observations: workorder.workOrder.observations,
        ot_type: String(workorder.otTypeProps),
      });
      setIsConfirmedOT(workorder.workOrder.is_confirmed);
      setIsPaymentConfirmed(workorder.workOrder.is_payment);
    }
  }, [workorder]);
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
                    label="Patente"
                    fullWidth
                    id="license_vehicle"
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
                    inputProps={{
                      readOnly: client !== null && !modifyWO,
                    }}
                    sx={{
                      opacity: client !== null && !modifyWO ? 0.5 : 1,
                    }}
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
                    inputProps={{
                      readOnly: client !== null && !modifyWO,
                    }}
                    sx={{
                      opacity: client !== null && !modifyWO ? 0.5 : 1,
                    }}
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
                    inputProps={{
                      readOnly: client !== null && !modifyWO,
                    }}
                    sx={{
                      opacity: client !== null && !modifyWO ? 0.5 : 1,
                    }}
                    {...register("rut")}
                  />
                  {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )}
                </Grid>
              </Grid>

              <Grid container mt={2} spacing={3} columnSpacing={3}>
                <Grid item xs={4}>
                  <Autocomplete
                    value={otType}
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
                    rows={1}
                    id="observations"
                    placeholder="Observaciones"
                    // label={"Observaciones"}
                    label={observations ? null : "Observaciones"}
                  />
                </Grid>
              </Grid>
              <Typography sx={{ mb: 2, mt: 4, fontWeight: "bold" }}>
                CONFIRMACIÓN / PAGO
              </Typography>
              <Grid container mt={2} columnSpacing={3} mb={5}>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isConfirmedOT}
                        onChange={(e) => setIsConfirmedOT(e.target.checked)}
                      />
                    }
                    label="Confirmación Orden de trabajo"
                  />
                </Grid>
                <Grid item ml={5} xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isPaymentConfirmed}
                        onChange={(e) =>
                          setIsPaymentConfirmed(e.target.checked)
                        }
                      />
                    }
                    label="Confirmación Pago Orden de trabajo"
                  />
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
                    {otByPPU?.map((workOrderField: ResponseOTByPPU) => (
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
                        <TableCell component="th" scope="row">
                          <Button
                            onClick={() => editOT(workOrderField.ot_number)}
                          >
                            Editar
                          </Button>
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
              <Button variant="contained" onClick={generateQuotation}>
                Cotizar
              </Button>
              {/* <Button variant="contained" onClick={generateQuotationWithStatus}>
                Guardar
              </Button> */}
              <Button variant="contained" onClick={findWO}>
                Buscar
              </Button>
              {/* <Button variant="contained" disabled={modifyWO} onClick={() => setModifyWO(true)}>
                MODIFICAR
              </Button> */}
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
