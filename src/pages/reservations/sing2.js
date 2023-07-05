import React, { useState, createContext, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppContext from "@/components/AppContext";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
// import fondo from "../img/playa.jpeg";
import background from "../img/playa.jpeg";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">DEVAS</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const router = useRouter();
  const context = useContext(AppContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const login = (e) => {
    e.preventDefault();
    if (
      (username === "admin" && password === "admin") ||
      (username === "jbarron" && password === "jbarronAd")
    ) {
      console.log("login");
      context.setLoading(true);
      context.setUserFullName("Juan Barron");
      context.setCity("CDMX");
      context.setBranch("SUR");
      context.setUserId(3);

      let pageUrl = "/reservations/orders";
      router.push(pageUrl);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en al iniciar sesión",
        text: "Error en al iniciar sesión, verifique sus credenciales",
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/wooden-board-empty-table-front-blue-sea-sky-background-perspective-wood-floor-sea-sky-can-be-used-display-montage-your-products-beach-summer-concepts_1253-804.jpg?w=1380&t=st=1685733357~exp=1685733957~hmac=7323b7d9c1ce5c8d414611d58c436334ce69416161b39e2e73e708360042f720")`,
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Grid item xs={false} sm={80} md={5}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                border: "2px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                borderColor: "blue",
                justifyContent: "left",
              }}
            >
              <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Usuario"
                  name="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="submit"
                  className="items-center justify-center w-full
                  mt-7 rounded-md bg-blue-900 px-3 py-2 text-sm
                      font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Iniciar sesión
                </button>
              </Box>
            </Box>
          </Grid>

          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
