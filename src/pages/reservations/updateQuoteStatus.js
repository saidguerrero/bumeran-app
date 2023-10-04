import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Swal from "sweetalert2";
import { Configs } from "@/Config";
import axios from "axios";
import { dataDecrypt } from "@/utils/data-decrypt";
import Loading from "@/components/Loading";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function UpdateQuoteStatus(props) {
  const { orderId, statusId, setOpenStatusPopup, updateTempOrder } = props;
  const [newStatusId, setNewStatusId] = useState(0);
  const [loading, setLoading] = useState(false);

  const configs = new Configs();
  const url = configs.current.URL_WS_TRAVEL_API;

  const reset = (e) => {
    setOpenStatusPopup(false);
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(orderId);
    // console.log(newStatusId);
    try {
      const data = {
        orderId,
        statusId: newStatusId,
      };
      const response = await axios.put(
        url + `/orders/updateStatusQuote`,
        data,
        {
          headers: {
            Authorization: ` ${dataDecrypt(sessionStorage.getItem("token"))}`,
          },
        }
      );

      const items = response.data;
      // console.log(items);
      setLoading(false);
      setOpenStatusPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "El estatus de pago se actualizó correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      let status = "";
      // console.log(newStatusId);
      switch (newStatusId) {
        case "2":
          status = "PAGADO";
          break;
        case "3":
          status = "CANCELADO";
          break;

        default:
          break;
      }
      // console.log("el estatus es: " + status);
      updateTempOrder(e, orderId, newStatusId, status);
    } catch (error) {
      console.log(error);
      setLoading(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al cargar los datos, contacte al administrador",
      });
    }
  };

  return (
    <div className="bg-gray-200">
      {loading ? <Loading /> : null}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <FormControl sx={{ width: 300 }}>
                    <InputLabel>Estatus de pago</InputLabel>
                    <Select
                      id="exchange"
                      name="exchange"
                      value={newStatusId}
                      onChange={(e) => setNewStatusId(e.target.value)}
                      label="exchange"
                      defaultValue={"1"}
                    >
                      <MenuItem value="2">Pagado</MenuItem>
                      <MenuItem value="3">Cancelado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <br />
                </Grid>
              </Grid>
              <br />
              <button
                onClick={(e) => reset(e)}
                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mr-5"
              >
                Cancelar
              </button>
              {""}
              <button
                onClick={(e) => handleUpdateStatus(e)}
                className="ml-5 rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Actualizar Estatus de Pago
              </button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
