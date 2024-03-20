import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Swal from "sweetalert2";
import { Configs } from "@/Config";
import axios from "axios";
import { dataDecrypt } from "@/utils/data-decrypt";
import Loading from "@/components/Loading";

import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function CommissionReleased(props) {
  const router = useRouter();

  const { orderId, commissionReleased, commissionStatus,  setOpenCommissionReleasedPopup, updateCommissionReleased } = props;

  const [paymentMethodId, setPaymentMethodId] = useState(0);
  const [commissionReleasedAmount, setCommissionReleasedAmount] = useState(0);
  const [newCommissionStatus, setNewCommissionStatus] = useState(0);

  
  const [loading, setLoading] = useState(false);

  const configs = new Configs();
  const url = configs.current.URL_WS_TRAVEL_API;

  const reset = (e) => {
    setOpenCommissionReleasedPopup(false);
  };

  const handleCommissionReleased = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(orderId);
    // console.log(newStatusId);
    try {
      const data = {
        orderId,
        commissionReleased: commissionReleasedAmount,
        commissionStatus: newCommissionStatus

      };
      const response = await axios.put(
        url + `/orders/updateCommissionReleased`,
        data,
        {
          headers: {
            Authorization: ` ${dataDecrypt(sessionStorage.getItem("token"))}`,
          },
        }
      );

      setLoading(false);
      setOpenCommissionReleasedPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "¡Comision liberada se actualizo con éxito!",
        showConfirmButton: false,
        timer: 1500,
      });
     
      updateCommissionReleased(e, orderId, commissionReleasedAmount, newCommissionStatus);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setOpenCommissionReleasedPopup(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al procesar Comision liberada. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  const handleOnChange = (e) => {
    console.log("entro a handleOnChange ")
    const newValue = parseFloat(e.target.value) || 0; // Convertir el valor a número, o 0 si no es un número
    console.log(newValue)
    setCommissionReleasedAmount(newValue);
    //setAmountDueNew((prevAmountDue) => prevAmountDue - newValue); // Restar partialPaymentAmount de amountDue
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

              <Grid item xs={4}>
                    <TextField
                      margin="normal"
                      required
                     
                      name="commissionReleased"
                      label="Comision Liberada"
                      type="number"
                      id="commissionReleased"
                      value={commissionReleasedAmount}
                      onChange={(e)=> handleOnChange(e)}
                   
                    />
                  </Grid>
                  <Grid item xs={6}>
                  <FormControl sx={{ width: 300 }}>
                    <InputLabel>Estatus de comision</InputLabel>
                    <Select
                      id="commissionStatus"
                      name="commissionStatus"
                      value={newCommissionStatus}
                      onChange={(e) => setNewCommissionStatus(e.target.value)}
                      label="commissionStatus"
                      
                    >
                       <MenuItem value="0">NO</MenuItem>
                      <MenuItem value="1">SI</MenuItem>
                     
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
                  className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={(e) => handleCommissionReleased(e)}
                >
                  Guardar
                </button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
