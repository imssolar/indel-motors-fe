import { Layout } from "../../components/Layout/Layout";
import { useContext, useEffect, useState } from "react";
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
  Select
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { RequestArraySpare, RequestWO, Spare } from "../../types/workorder";
import { WorkOrderContext } from "../../context/workOrder/WorkOrderContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



interface ISpare {
  id: number;
  stock: number;
  name: string;
  isDisabled: boolean;
}

interface IOptions{
  value:string,
  label:string
}

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
export const WorkOrder = () => {
  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RequestWO>();

  const {
    sparesToWorkOrder,
    vehicle,
    ordersType,
    sparesFiltered,
    message,
    getClientByPPU,
    getWorkOrderType,
    getSparesToWorkOrder,
    addNewWorkOrder,
    filterSparesToWorkOrder,
    cleanClientNames,
    cleanSearchData,
  } = useContext(WorkOrderContext);

  const onSubmit: SubmitHandler<RequestWO> = async (formData) => {
    const newWorkOrder = {
      observations: formData.observations,
      ot_type: formData.ot_type,
      license_vehicle: formData.license_vehicle,
      spares,
    };
    const isAnyDefaultSpare = spares.some(
      (spare: RequestArraySpare): boolean =>
        spare.id === 0 || spare.stock === 0 || Number.isNaN(spare.stock)
    );

    if (isAnyDefaultSpare) {
      Swal.fire({
        icon: "error",
        title: "Ooops!",
        text: `Debes seleccionar repuesto y stock para crear la orden de trabajo`,
      });
      return;
    } else {
      addNewWorkOrder(newWorkOrder);
    }
  };
  const licenseValue = watch("license_vehicle");
  const brandForm = watch("brand") ?? "";
  const modelForm = watch("model") ?? "";

  const [type, setType] = useState("");
  const [spares, setSpares] = useState<RequestArraySpare[]>([
    { id: 0, stock: 0 },
  ]);



  const handleTypeOrderChange = (event: SelectChangeEvent): void => {
    setType(event.target.value as string);
  };

  const navigate = useNavigate();

  const options:IOptions[] = sparesFiltered.map((item) => {
	return { value: item.id.toString(), label: item.name };
  }) ;

  const handleSpareID = (
    event: SelectChangeEvent,
    index: number,
    label: string = "id"
  ) => {
    const mapSpare = spares.map(
      (spare: RequestArraySpare, indexSpare: number) => {
        if (indexSpare === index) {
          return {
            id: label === "id" ? parseInt(event.target.value) : spare.id,
            stock:
              label === "stock" ? parseInt(event.target.value) : spare.stock,
          };
        }
        return spare;
      }
    );

    const {brand} = vehicle
  

    const arrayIDs = mapSpare.map((spare) => spare.id);

    filterSparesToWorkOrder(arrayIDs);
    setSpares(mapSpare);
  };

  useEffect(()=>{
    setValue("brand",vehicle.brand)
  },[vehicle])

  useEffect(() => {
    if (licenseValue?.length >= 6) {
      getClientByPPU(licenseValue);

    }
    if(vehicle){
      setValue("brand")
    }
    else {
      cleanClientNames();
      setValue("names", "");
    }
  }, [licenseValue]);

  useEffect((): void => {
    getWorkOrderType();
    getSparesToWorkOrder();
  }, []);

  const AddNewSpare = (): void => {
    const newSpare = [{ id: 1, stock: 0 }];
    setSpares([...spares, ...newSpare]);
  };

  useEffect(() => {
    cleanSearchData();
  }, []);


  
  useEffect((): void => {
    if (message.text && message.type === "outStock") {
      console.log("type error");
      Swal.fire({
        icon: "error",
        title: "Ooops!",
        text: `${message.text}`,
        confirmButtonColor: "#d33",
        confirmButtonText: "Ver productos sin stock",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/workorder-stock");
        }
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


 
  return (
    <Layout>
      <Container
        component={"main"}
        maxWidth="lg"
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
                    label="Marca"
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
                    label="Modelo"
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
              {/* <Grid container spacing={3}>
                <Grid item xs={4}>
                  <TextField
                    required
                    fullWidth
                    id="names"
                    label="Nombre(s)"
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
                    id="license_plate"
                    label="surnames"
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
                    id="license_plate"
                    label="R.U.T"
                    {...register("license_vehicle")}
                  />
                  {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )}
                </Grid>
              </Grid> */}
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
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.ppu}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.ot}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.ot}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.fecha}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.obs}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.tipo}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography sx={{ mt: 3, fontWeight: "bold" }}>
              ORDEN DE TRABAJO
            </Typography>
            {/* <Box component={"form"} noValidate sx={{ mt: 3 }}>
              {spares.length > 0 &&
                spares.map(({ id }, index) => {
                  return (
                    <Box sx={{ flexGrow: 1, mb: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Repuesto
                            </InputLabel>
                            <Select
                              value={id}
                              onChange={(event) => handleSpareID(event, index)}
                              options={options}
                              isSearchable
                              placeholder="Search..."
                            />

                            <Select
																		labelId="demo-simple-select-label"
																		id={id.toString()}
																		label="Repuesto"
																		placeholder="Seleccione repuesto"
																		// {...register('ot_type')}
																		// value={id}
																		name={id.toString()}
																		onChange={(event) =>
																			handleSpareID(event, index)
																		}
																	>
																		{sparesFiltered?.map((spare: ISpare) => (
																			<MenuItem
																				key={spare.id}
																				value={spare.id}
																				disabled={spare.isDisabled}
																				style={
																					spare.isDisabled
																						? { display: 'none' }
																						: { display: 'block' }
																				}
																			>
																				{spare.name}
																			</MenuItem>
																		))}
																	</Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            onChange={(event) =>
                              handleSpareID(event, index, "stock")
                            }
                            label={"stock"}
                          >
                            1
                          </TextField>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
            </Box> */}
          </CardContent>
        </Card>
        {/* <Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'row',
						alignItems: '',
					}}
				>
					
					<Box
						component={'form'}
						noValidate
						sx={{ mt: 3}}
						onSubmit={handleSubmit(onSubmit)}
					>
						<Grid
							container
							spacing={3}
							maxWidth="md"
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
							}}
						>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="license_plate"
									label="Patente"
									{...register('license_vehicle')}
								/>
								{errors.license_vehicle && (
									<p>{errors.license_vehicle.message}</p>
								)}
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="names"
									sx={{ opacity: '0.5' }}
									inputProps={{ readOnly: true }}
									label={namesValue?.length > 0 ? '' : 'Nombres / apellidos'}
									{...register('names')}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									required
									id="observations"
									{...register('observations')}
									placeholder="Observaciones"
								/>
							</Grid>

							<Grid item xs={12}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-label">Tipo</InputLabel>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={type}
										label="Tipo de Orden"
										{...register('ot_type')}
										placeholder="Seleccione tipo de orden"
										onChange={handleTypeOrderChange}
									>
										{ordersType?.map((type) => (
											<MenuItem key={type.id} value={type.id}>
												{type.name}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
							Crear
						</Button>
					</Box>
				</Box> */}
        {/* <Box>
          <Container component={"main"} maxWidth="xs">
            <CssBaseline />
            <Card>
              <CardContent>
                <Box
                  sx={{
                    marginTop: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography component={"h1"} variant="h5">
                    Repuestos
                  </Typography>
                  <Grid
                    container
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={2}
                  >
                    <Typography>Agregar repuestos</Typography>

                    <Button
                      onClick={() => AddNewSpare()}
                      variant="contained"
                      disabled={spares.length === sparesToWorkOrder.length}
                    >
                      +
                    </Button>
                  </Grid>
                  <Box component={"form"} noValidate sx={{ mt: 3 }}>
                    {spares.length > 0 &&
                      spares.map(({ id }, index) => {
                        return (
                          <Box sx={{ flexGrow: 1, mb: 1 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <FormControl fullWidth>
                                  <InputLabel id="demo-simple-select-label">
                                    Repuesto
                                  </InputLabel>

                                  <Select
                                    labelId="demo-simple-select-label"
                                    id={id.toString()}
                                    label="Repuesto"
                                    placeholder="Seleccione repuesto"
                                    {...register('ot_type')}
                                    value={id}
                                    name={id.toString()}
                                    onChange={(event) =>
                                      handleSpareID(event, index)
                                    }
                                  >
                                    {sparesFiltered?.map((spare: ISpare) => (
                                      <MenuItem
                                        key={spare.id}
                                        value={spare.id}
                                        disabled={spare.isDisabled}
                                        style={
                                          spare.isDisabled
                                            ? { display: "none" }
                                            : { display: "block" }
                                        }
                                      >
                                        {spare.name}
                                      </MenuItem>
                                     ))} 
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  onChange={(event) =>
                                    handleSpareID(event, index, "stock")
                                  }
                                  label={"stock"}
                                >
                                  1
                                </TextField>
                              </Grid>
                            </Grid>
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Container>
        </Box> */}
        {/* {sparesOutStock.length > 0 && 
					<Box>
					<Container component={'main'} maxWidth="lg">
						<CssBaseline />
						<Card>
							<CardContent>
								<Box
									sx={{
										marginTop: 1,
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}
								>
									<Typography component={'h1'} variant="h5">
										Repuestos sin stock
									</Typography>

									<OutStockTable sparesOutStock={sparesOutStock}/>
								</Box>
							</CardContent>
						</Card>
					</Container>
				</Box>
				
				} */}
      </Container>
    </Layout>
  );
};
