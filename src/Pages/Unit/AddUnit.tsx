import {
  Box,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Button,
  Container,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { unitSchema } from "../../schemas/unitSchema";
import { UnitContext } from "../../context/Unit/UnitContext";
import Swal from "sweetalert2";

interface IFormInput {
  name_unit: string;
  description?: string;
}

export const AddUnit = () => {
  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: {  },
  } = useForm<IFormInput>({
    resolver: yupResolver(unitSchema),
  });

  const [modifyUnit, setModifyUnit] = useState<Boolean>(false);

  const {
    unit,
    message,
    addUnit,
    UnitFind,
    editUnit,
    deleteUnit,
    clearUnitFinder,
  } = useContext(UnitContext);

  const nameUnitForm = watch("name_unit") ?? "";
  const descriptionForm = watch("description") ?? "";

  useEffect(() => {
    setValue("name_unit", unit?.name_unit ?? "");
    setValue("description", unit?.description ?? "");
  }, [unit]);

  const onSubmit: SubmitHandler<IFormInput> = async (
    formData: IFormInput
  ): Promise<void> => {
    addUnit(formData);
  };

  useEffect((): void => {
    clearUnitFinder();
    if (message.text && message.type === "error") {
      Swal.fire({
        icon: "error",
        title: "Ooops!",
        text: `${message.text}`,
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

  useEffect((): void => {
    clearUnitFinder();
  }, []);

  const saveUnit = () => {
    const obj = {
      name_unit: nameUnitForm,
      description: descriptionForm,
    };
    if (modifyUnit) {
      editUnit(obj);
      setModifyUnit(false);
    } else {
      addUnit(obj);
    }

    cleanForm();
  };

  const deleteUnitByName = () => {
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
        deleteUnit(nameUnitForm);
      }
    });
    cleanForm();
  };

  const findUnit = () => {
    UnitFind(nameUnitForm);
  };

  const cleanForm = () => {
    setValue("name_unit", "");
    setValue("description", "");
  };

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
              INGRESO DE UNIDADES
            </Typography>
            <Box
              component={"form"}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography sx={{ mb: 2, fontWeight: "bold" }}>DATOS</Typography>
              <Grid container spacing={3} columnSpacing={3}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="name_unit"
                    label="NOMBRE UNIDAD"
                    inputProps={{ readOnly: modifyUnit }}
                    sx={{ opacity: modifyUnit ? 0.5 : 1 }}
                    {...register("name_unit")}
                  />
                </Grid>
                <Grid item xs={6}>
                  {/* <TextField
                    required
                    fullWidth
                    id="brand"
                    label={descriptionForm?.length > 0 ? "" : "DESCRIPCIÓN"}
                    inputProps={{
                      readOnly: unit !== null && !modifyUnit,
                    }}
                    sx={{
                      opacity: unit !== null && !modifyUnit ? 0.5 : 1,
                    }}
                    {...register("description")}
                  /> */}
                  <label>Descripción</label>
                  <input name="description" type="text" value={descriptionForm} placeholder="descripción"/>
                  {/* {errors.license_vehicle && (
                    <p>{errors.license_vehicle.message}</p>
                  )} */}
                </Grid>
              </Grid>
            </Box>

            <Stack sx={{ mt: 5 }} direction="row" spacing={2}>
              <Button variant="contained" onClick={saveUnit}>
                GUARDAR
              </Button>
              <Button variant="contained" onClick={findUnit}>
                Buscar
              </Button>
              <Button variant="contained" onClick={() => setModifyUnit(true)}>
                MODIFICAR
              </Button>
              <Button variant="contained" onClick={deleteUnitByName}>
                ELIMINAR
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
};
