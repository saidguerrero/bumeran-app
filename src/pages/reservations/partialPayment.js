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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function PartialPayment(props) {
  const router = useRouter();

  const { orderId, partialPaymentNumber, amountDue, setOpenPartialPaymentPopup, updatePartialPayment } = props;
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethodId, setPaymentMethodId] = useState(0);
  const [partialPaymentAmount, setPartialPaymentAmount] = useState(0);
  const [amountDueNew, setAmountDueNew] = useState(amountDue);

  
  const [loading, setLoading] = useState(false);

  const configs = new Configs();
  const url = configs.current.URL_WS_TRAVEL_API;

  const reset = (e) => {
    setOpenPartialPaymentPopup(false);
  };

  const handlePartialPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(orderId);
    // console.log(newStatusId);
    try {
      const data = {
        orderId,
        partialPaymentNumber: partialPaymentNumber + 1,
        paymentAmount:partialPaymentAmount,
        paymentMethodId

      };
      const response = await axios.post(
        url + `/partialPayment`,
        data,
        {
          headers: {
            Authorization: ` ${dataDecrypt(sessionStorage.getItem("token"))}`,
          },
        }
      );

      setLoading(false);
      setOpenPartialPaymentPopup(false);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "¡Pago parcial realizado con éxito!",
        showConfirmButton: false,
        timer: 1500,
      });
     
      updatePartialPayment(e, orderId, partialPaymentAmount);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setOpenPartialPaymentPopup(false);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al procesar el pago parcial. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  const handlePartialPaymentChange = (e) => {
    console.log("entro a handlePartialPaymentChange ")
    const newValue = parseFloat(e.target.value) || 0; // Convertir el valor a número, o 0 si no es un número
    console.log(newValue)
    setPartialPaymentAmount(newValue);
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
                      disabled
                      name="amount"
                      label="Numero de Parcialidad"
                      type="number"
                      id="amount"
                      value={partialPaymentNumber + 1}
                      autoComplete="amount"
                    />
                  </Grid>

              <Grid item xs={4}>
                    <TextField
                      margin="normal"
                      required
                     
                      name="amount"
                      label="Monto parcial del pago"
                      type="number"
                      id="amount"
                      value={partialPaymentAmount}
                      onChange={(e)=> handlePartialPaymentChange(e)}
                      autoComplete="amount"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      margin="normal"
                      required
                      disabled
                      name="amount"
                      label="Monto Adeudado"
                      type="number"
                      id="amount"
                      value={amountDueNew}
                      autoComplete="amount"
                    />
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
                  onClick={(e) => handlePartialPayment(e)}
                >
                  Realizar Pago Parcial
                </button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
