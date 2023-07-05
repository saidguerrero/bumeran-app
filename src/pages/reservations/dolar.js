import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Layout from "@/components/layout";
import AppContext from "@/components/AppContext";
import Loading from "@/components/Loading";
import axios from "axios";
import { Configs } from "@/Config";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function Dolar() {
  const context = useContext(AppContext);
  const router = useRouter();
  const [dolar, setDolar] = useState(0);

  const configs = new Configs();
  const url = configs.current.URL_WS_TRAVEL_API;

  const fetchDolar = async () => {
    const response = await axios.get(url + `/currency/dollar`, {
      headers: {
        Authorization: ` ${localStorage.token}`,
      },
    });
    console.log("********* Dolar **********");
    const items = response.data;
    // traer valor dummy
    // const items = data;
    console.log(items);

    setDolar(items.result);
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role != "Administrador" && role != "Root") {
      router.push("/reservations/orders");
    }

    fetchDolar();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    console.log("******* Dolar *********");
    console.log(dolar);

    if (!dolar) {
      Swal.fire({
        icon: "error",
        title: "Error en validación",
        text: "El valor del dolar no puede estar vacio",
      });
      return;
    }

    context.setLoading(true);
    const data = {
      price: dolar,
      userId: localStorage.userId,
    };

    const response = await axios.post(url + `/currency/dollar`, data, {
      headers: {
        Authorization: ` ${localStorage.token}`,
      },
    });

    router.push("/reservations/orders");
  };

  const reset = (e) => {
    e.preventDefault();
    setOrder({
      id: "",
      fullName: "",
      amount: "",
      travelInfo: "",
      supplier: "",
      reservationNumber: "",
      city: "",
      branch: "",
      salesPerson: "",
      contactPhoneNum: "",
      contactEmail: "",
      emergencyContactPhone: "",
      emergencyContact: "",
    });
  };

  return (
    <Layout title="Actualizar Precio Dolar">
      <div className="bg-gray-200 " style={{ height: 650 }}>
        {context.loading ? <Loading /> : null}
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <br />
              <br />
              <Typography component="h1" variant="h5">
                Precio Dolar
              </Typography>
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
                  <Grid item>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="dolar"
                      label="Precio Dolar"
                      type="number"
                      id="dolar"
                      value={dolar}
                      onChange={(e) => {
                        setDolar(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <button
                      onClick={save}
                      className="mt-7 rounded-md bg-blue-900 px-3 py-2 text-sm
                      font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Actualizar Precio
                    </button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </Layout>
  );
}
