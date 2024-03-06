import { useContext, useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { MessageAlert } from "../../components/MessageAlert/MessageAlert";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../schemas/loginSchema";
import { AuthContext } from "../../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

interface IFormInput {
  email: string;
  password: string;
}

export const Login = () => {
  const [showMessage, setShowMessage] = useState(false);

  const { login, token, messageAuth, cleanMessage } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const onSubmit: SubmitHandler<IFormInput> = async (sendData) => {
    //armar context
    //react-table props: pasarle botones, data, columnas y cantidad de elementos
    //ruta privada del fe-supermercado
    await login(sendData);

    // navigate("/menu")
  };

  useEffect(() => {
    if (messageAuth.text && messageAuth.type === "error") {
      console.log("type error");
      Swal.fire({
        icon: "error",
        title: "Ooops!",
        text: `${messageAuth.text}`,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) cleanMessage();
      });
      return;
    }
    if (messageAuth.text && messageAuth.type === "notFound") {
      Swal.fire({
        icon: "error",
        title: "Ooops!",
        text: `${messageAuth.text}`,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) cleanMessage();
      });
      return;
    }
  }, [messageAuth.text || messageAuth.type]);

  useEffect(() => {
    if (token || localStorage.getItem("token")) {
      navigate("/menu");
    }
  }, [token]);

  return (
    <Grid container component={"main"} sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            "url('https://source.unsplash.com/random?wallpapers')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="h5">
            Iniciar Sesión
          </Typography>
          <Avatar sx={{ m: 1, bgcolor: "blue" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("email")}
              fullWidth
              margin="normal"
              autoFocus
              variant="outlined"
              type="text"
              label="Correo*"
              name="email"
              onChange={() => setShowMessage(false)}
            />
            <TextField
              {...register("password")}
              fullWidth
              variant="outlined"
              type="password"
              label={"contraseña*"}
              name="password"
              onChange={() => setShowMessage(false)}
            />
            {errors.password && showMessage && (
              <MessageAlert messageToShow={errors.password.message} />
            )}
            <Button
              sx={{ mt: 4 }}
              fullWidth
              variant="contained"
              type="submit"
              onClick={() => setShowMessage(true)}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
