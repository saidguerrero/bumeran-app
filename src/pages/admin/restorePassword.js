import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";

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
  const [search, setSearch] = useState("");

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

  const handleSearch = async (e) => {
    console.log("handleSearch");
    if (search !== undefined) {
      if (search?.length > 3) {
        const token = dataDecrypt(sessionStorage.getItem("token"));
        const response = await axios.get(url + `/user/usersByEmail/${search}`, {
          headers: {
            Authorization: ` ${token}`,
          },
        });

        const items = response.data;
        console.log(items.result);
        const data = items.result.data[0].orders;
        console.log(data[0]);
        setOrders(data);
      }
    }
  };

  return (
    <Layout title="Restablecer Password">
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
                      id="search"
                      placeholder="Buscar por Email o Nombre"
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      autoFocus
                      className="w-96"
                    />
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
                  onClick={(e) => handleSearch(e)}
                  className="ml-5 rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Buscar
                </button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </Layout>
  );
}
