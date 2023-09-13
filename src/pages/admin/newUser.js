import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Layout from "@/components/layout";
import Loading from "@/components/Loading";
import { dataDecrypt } from "@/utils/data-decrypt";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function NewOrder() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    roleId: 2,
    branchId: 0,
    cityId: 0,
    email: "",
    login: "",
    password: "",
    fullName: "",
  });

  //   useEffect(() => {
  //     const user = dataDecrypt(localStorage.getItem("user"));
  //     setUser(user);
  //   }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    // console.log(value);
    // console.log(e.target.name);
    setOrder({ ...order, [e.target.name]: value });
  };

  return (
    <Layout title="Crear Cotización">
      <div className="bg-gray-200" style={{ height: 650, width: "100%" }}>
        {loading ? <Loading /> : null}
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 1,
                marginLeft: 20,
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
                      margin="normal"
                      required
                      fullWidth
                      id="fullName"
                      label="Nombre"
                      name="fullName"
                      autoComplete="fullName"
                      value={user.fullName}
                      onChange={(e) => handleChange(e)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="email"
                      label="email"
                      id="email"
                      value={user.email}
                      onChange={(e) => handleChange(e)}
                      autoComplete="email"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      value={user.password}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ width: 300 }}>
                      <InputLabel>Ciudad</InputLabel>
                      <Select
                        id="cityId"
                        name="cityId"
                        value={user.cityId}
                        onChange={(e) => handleChange(e)}
                        label="Ciudad"
                      >
                        <MenuItem value=""></MenuItem>
                        {cities.map((city) => (
                          <MenuItem key={city.cityId} value={city.cityId}>
                            {city.description}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ width: 300 }}>
                      <InputLabel>Unidad Price Shoes</InputLabel>
                      <Select
                        id="branchId"
                        name="branchId"
                        value={user.branchId}
                        onChange={(e) => handleChange(e)}
                        label="Unidad Price Shoes"
                      >
                        <MenuItem value=""></MenuItem>
                        {branches.map((branch) => (
                          <MenuItem
                            key={branch.branchId}
                            value={branch.branchId}
                          >
                            {branch.description}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <button
                  onClick={(e) => reset(e)}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mr-5"
                >
                  Cancelar
                </button>
                {""}
                <button
                  onClick={(e) => createNewUser(e)}
                  className="ml-5 rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Guardar
                </button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </Layout>
  );
}
