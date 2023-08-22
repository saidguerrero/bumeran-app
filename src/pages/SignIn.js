import React, { useState, createContext, useContext } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppContext from "@/components/AppContext";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import axios from "axios";
import { Configs } from "@/Config";

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

  const configs = new Configs();
  // const url = configs.current.URL_WS_TRAVEL_API;
  // const url =
  //   "http://api-rest-bumeran-aws-env.eba-ummp4ehp.us-east-2.elasticbeanstalk.com/travelagency";
  const url = "https://racial-letter-production.up.railway.app//travelagency";

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

  const login = async (e) => {
    e.preventDefault();
    let token;
    const data = {
      userName: username,
      password,
    };

    try {
      await axios
        .post(
          // "http://api-rest-bumeran-aws-env.eba-ummp4ehp.us-east-2.elasticbeanstalk.com/travelagency/login",
          url + `/login`,
          // "http://localhost:9081/travelagency/login",
          data
        )
        .then((response) => {
          token = response.headers.authorization;

          console.log("*************** token ***************");
          console.log(token);
          // Aquí puedes hacer lo que necesites con el token, como guardarlo en el estado de tu componente o en el localStorage
        })
        .catch((error) => {
          // Manejo de errores
          console.log("++++error");
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error en al iniciar sesión",
            text: "Error en al iniciar sesión, verifique sus credenciales",
          });
        });

      const userData = await axios.get(
        url + `/api/v1/user/byUsername/` + username,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );
      console.log("*************** userData ***************");
      console.log(userData);
      console.log(userData.data.result.fullName);
      localStorage.setItem("token", token);
      console.log("login");
      context.setLoading(true);
      context.setUserFullName(userData.data.result.fullName);
      context.setCity(userData.data.result.city);
      context.setBranch(userData.data.result.branch);
      context.setUserId(userData.data.result.userId);
      context.setCurrentDate(userData.data.result.currentDate);

      context.setRole(userData.data.result.role);
      context.setRoleId(userData.data.result.roleId);
      localStorage.setItem("role", userData.data.result.role);
      localStorage.setItem("userId", userData.data.result.userId);
      let pageUrl = "/reservations/orders";
      router.push(pageUrl);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error en al iniciar sesión",
        text: "Error en al iniciar sesión, verifique sus credenciales",
      });
    }

    // if (
    //   (username === "admin" && password === "admin") ||
    //   (username === "jbarron" && password === "jbarronAd")
    // ) {
    //   console.log("login");
    //   context.setLoading(true);tg44g
    //   context.setUserFullName("Juan Barron");
    //   context.setCity("CDMX");
    //   context.setBranch("SUR");
    //   context.setUserId(3);

    //   let pageUrl = "/reservations/orders";
    //   router.push(pageUrl);
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error en al iniciar sesión",
    //     text: "Error en al iniciar sesión, verifique sus credenciales",
    //   });
    // }
  };

  return (
    <div
      className="container min-h-screen min-w-full "
      style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/wooden-board-empty-table-front-blue-sea-sky-background-perspective-wood-floor-sea-sky-can-be-used-display-montage-your-products-beach-summer-concepts_1253-804.jpg?w=1380&t=st=1685733357~exp=1685733957~hmac=7323b7d9c1ce5c8d414611d58c436334ce69416161b39e2e73e708360042f720")`,
        width: "100%",
        height: "100%",
        backgroundSize: "cover",
      }}
    >
      <header>
        <div className=" flex justify-between items-center p-4">
          <div className="container flex flex-col items-end justify-center ">
            <Image
              alt="Bumeran"
              src={"/priceShoesLogo.png"}
              width={200}
              height={60}
            />
          </div>
        </div>
      </header>
      <ThemeProvider theme={theme}>
        <div className=" items-start justify-start h-screen pt-2">
          <Container maxWidth="xs">
            <CssBaseline />

            <Grid item xs={false} sm={8} md={5}>
              <Box
                sx={{
                  border: "2px solid #ccc",
                  borderRadius: "10px",
                  padding: "20px",
                  borderColor: "blue",
                  justifyContent: "left",
                }}
              >
                <Box
                  component="form"
                  onSubmit={login}
                  noValidate
                  sx={{ mt: 1 }}
                >
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
          <footer>
            <div className=" width: 100%  p-5 bg-center bg-cover ml-60 flex flex-col items-end justify-center ">
              <Image
                alt="Adjuntar archivos"
                src={"/logo_vb_blanco.png"}
                width={100}
                height={100}
              />
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </div>
  );
}
