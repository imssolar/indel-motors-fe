import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ClientContext } from "../../context/Client/ClientContext";
import { Layout } from "../../components/Layout/Layout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const headers = [
  "Rut",
  "Nombres",
  "Apellido(s)",
  "Número teléfono",
  "Dirección",
  "Comuna",
  "Correo",
  "Estado(habilitado o deshabilitado)",
];

export const ClientList = () => {
  const { getClients, clients } = React.useContext(ClientContext);

  React.useEffect(() => {
    getClients();
  }, []);

  const navigate = useNavigate();

  

  return (
    <Layout>
      <TableContainer component={Paper} sx={{ width: "1400px" }}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header, headerID) => (
                <TableCell key={headerID}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client, id) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {client.rut}
                </TableCell>
                <TableCell align="left">{client.names}</TableCell>
                <TableCell align="left">{client.surnames}</TableCell>
                <TableCell align="left">{client.cellphone_number}</TableCell>
                <TableCell align="left">{client.address}</TableCell>
                <TableCell align="left">{client.district}</TableCell>
                <TableCell align="left">{client.email}</TableCell>
                <TableCell align="left">{client.status}</TableCell>
                <TableCell align="left">
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() =>
                      navigate("/client-edit", { state: { client } })
                    }
                  >
                    Editar
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button color="error" variant="contained" >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};
