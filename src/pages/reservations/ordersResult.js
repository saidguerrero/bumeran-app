import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/Download";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Reservaciones = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  const openModal = async (e) => {
    e.preventDefault();
    // console.log("id");
    setOpenPopup(true);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // const response = await fetch(
      //   `http://localhost:9081/travelagency/api/v1/orders`,
      //   {
      //     method: "GET",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
      // console.log(response);

      // const response = data;
      // const items = await response.json();
      const items = [];
      console.log(items);
      setOrders(items.result);
      // setOrders(response.result);
      console.log("orders**************");
      console.log(orders);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Folio</StyledTableCell>
            <StyledTableCell align="right">
              Estatus Pago del Cliente
            </StyledTableCell>
            <StyledTableCell align="right">Estatus Pago VB</StyledTableCell>
            <StyledTableCell align="right">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="right">
                {row.quotationSheet}
              </StyledTableCell>
              <StyledTableCell align="right">{row.paidStatus}</StyledTableCell>
              <StyledTableCell align="right">{row.paidStatus}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton aria-label="delete" size="small">
                  <DownloadIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" size="small">
                  <DownloadIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" size="small">
                  <DownloadIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="delete" size="small">
                  <DownloadIcon fontSize="inherit" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Reservaciones;
