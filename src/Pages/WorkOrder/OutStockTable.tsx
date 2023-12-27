import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Layout } from "../../components/Layout/Layout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { WorkOrderContext } from "../../context/workOrder/WorkOrderContext";
const headers = ["Repuesto","Unidades solicitadas para la orden","Unidades disponibles", "Unidades necesarias"];

export const OutStockTable = () => {
  const navigate = useNavigate();

  const { sparesOutStock,cleanMessage  } = React.useContext(WorkOrderContext);

  React.useEffect(()=>{
    cleanMessage()
  },[])
 
  return (
    <Layout>
      <TableContainer component={Paper} sx={{ width: "550px" }}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((header, headerID) => (
                <TableCell key={headerID}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sparesOutStock.map((spare) => (
              <TableRow
                key={spare.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {spare.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {spare.requestedStock}
                </TableCell>
                <TableCell component="th" scope="row">
                  {spare.currentStock}
                </TableCell>
                <TableCell component="th" scope="row">
                  {spare.stockThatINeed}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={()=>navigate('/work-order')}>Volver</Button>
    </Layout>
  );
};
