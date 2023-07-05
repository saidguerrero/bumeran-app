import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function OrderInfo(props) {
  const {
    contactPhoneNum,
    contactEmail,
    emergencyContactPhone,
    emergencyContact,
  } = props;
  return (
    <div className="bg-gray-200">
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
                  <TextField
                    disabled
                    margin="normal"
                    required
                    fullWidth
                    id="contactPhoneNum"
                    label="Teléfono de Contacto"
                    name="contactPhoneNum"
                    value={contactPhoneNum}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    margin="normal"
                    required
                    fullWidth
                    id="contactEmail"
                    label="Correo de Contacto"
                    name="contactEmail"
                    value={contactEmail}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="emergencyContact"
                    label="Contacto de Emergencia"
                    name="emergencyContact"
                    value={emergencyContact}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    disabled
                    margin="normal"
                    required
                    fullWidth
                    id="emergencyContactPhone"
                    label="Contacto de Emergencia"
                    name="emergencyContactPhone"
                    value={emergencyContactPhone}
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
