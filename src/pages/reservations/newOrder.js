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
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Layout from "@/components/layout";
import axios from "axios";
import Swal from "sweetalert2";
import AppContext from "@/components/AppContext";
import Loading from "@/components/Loading";
import { Configs } from "@/Config";
import IconButton from "@mui/material/IconButton";
import UploadFileIcon from "@mui/icons-material/UploadFile";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function NewOrder() {
  const context = useContext(AppContext);
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [flag, setFlag] = useState(false);
  const [order, setOrder] = useState({
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
    supplierId: 0,
    cityId: 0,
    branchId: 0,
    salesPersonId: 0,
    exchange: "MXN",
  });
  const [suppliers, setSuppliers] = useState([]);
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [salesPersons, setSalesPersons] = useState([]);

  const configs = new Configs();
  const url = configs.current.URL_WS_TRAVEL_API;

  const fetchSuppliers = async () => {
    // console.log("********* entro sup **********");
    // console.log(url);
    //add header authorization token
    const response = await axios.get(url + `/supplier`, {
      headers: {
        Authorization: ` ${localStorage.token}`,
      },
    });
    // console.log("********* supplier **********");
    const items = response.data;
    // traer valor dummy
    // const items = data;
    // console.log(items);

    setSuppliers(items.result);
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get(url + `/orders/items`, {
        headers: {
          Authorization: ` ${localStorage.token}`,
        },
      });

      const items = response.data;
      // console.log(items);
      setBranches(items.result.branches);
      setCities(items.result.cities);
      setSalesPersons(items.result.salesPersons);
      setSuppliers(items.result.suppliers);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al cargar los datos, contacte al administrador",
      });
    }
  };

  const fetchSalesPersons = async () => {
    const response = await axios.get(url + `/user/salesPerson`, {
      headers: {
        Authorization: ` ${localStorage.token}`,
      },
    });
    const items = response.data;
    setSalesPersons(items.result);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const [files64, setFiles64] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadfile = async (event) => {
    event.preventDefault();
    let allFiles = event?.target?.files?.length;
    let newFiles = [];
    let arrayFiles64 = [];
    if (allFiles > 2) {
      setFiles64("");
      return;
    } else if (allFiles > 0) {
      for (let i = 0; i < allFiles; i++) {
        arrayFiles64.push(await toBase64(event.target.files[i]));
        newFiles.push(event.target.files[i]);
      }

      setFiles64(arrayFiles64);
    }
    // console.log("arrayFiles64");
    // console.log(arrayFiles64);
    // console.log(files64);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // console.log(value);
    // console.log(e.target.name);
    setOrder({ ...order, [e.target.name]: value });
  };

  const handleOnclick = async (event) => {
    event.preventDefault();

    const response = await fetch(url + "/upload/base64", {
      method: "POST",
      body: files64,
    })
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response.data);
      })
      .catch((error) => {
        // Manejar el error
        console.log(error);
      });
  };

  //fetch data from backend with axios
  const fetchData = async (e) => {
    e.preventDefault();
    // console.log("******* file *********");
    let fileName = "magni.pdf";
    // console.log(fileName);
    context.setLoading(true);
    // const response = await axios.get(
    //  url + `upload/readTest/${fileName}`
    // );

    try {
      const response = await axios.post(url + `/upload/readQuotePDF`, files64, {
        headers: {
          Authorization: ` ${localStorage.token}`,
        },
      });
      // console.log(response);
      const data = await response.data.result;
      context.setLoading(false);
      setOrder({
        id: data.id,
        fullName: data.fullName,
        amount: data.amount,
        travelInfo: data.travelInfo,
        supplier: data.supplier,
        reservationNumber: data.reservationNumber,
        city: data.city,
        branch: data.branch,
        salesPerson: data.salesPerson,
        contactPhoneNum: data.contactPhoneNum,
        contactEmail: data.contactEmail,
      });
      context.setLoading(false);
    } catch (error) {
      console.log(error);
      context.setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error en validación",
        text: "Error al cargar el archivo, por favor intentar de nuevo",
      });
    }
  };

  const saveOrder = async (e) => {
    e.preventDefault();
    // console.log("******* order *********");
    // console.log(order);

    if (
      !order.amount ||
      !order.fullName ||
      !order.travelInfo ||
      !order.reservationNumber ||
      !order.cityId ||
      !order.branchId ||
      !order.salesPersonId ||
      !order.contactPhoneNum ||
      !order.contactEmail ||
      !order.emergencyContactPhone ||
      !order.emergencyContact ||
      !order.supplierId
    ) {
      Swal.fire({
        icon: "error",
        title: "Error en validación",
        text: "Campos vacios, por favor llenar todos los campos",
      });
      return;
    }

    //regex validate phone number 10 digits
    if (!/^[0-9]{10}$/.test(order.contactPhoneNum)) {
      Swal.fire({
        icon: "error",
        title: "Error en validación",
        text: "Número de teléfono no valido, debe contener 10 dígitos",
      });
      return;
    }

    const reg = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$");
    if (!reg.test(order.contactEmail)) {
      Swal.fire({
        icon: "error",
        title: "Error en validación",
        text: "Email no valido, por favor ingrese un email valido",
      });
      return;
    }
    context.setLoading(true);

    const check = await axios.get(
      url + `/orders/checkReservation/${order.reservationNumber}`,
      {
        headers: {
          Authorization: ` ${localStorage.token}`,
        },
      }
    );

    if (check.data.result) {
      context.setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Número de reservación",
        text: "Número de reservación ya existe, verifique.",
      });
      return;
    }

    const response = await axios
      .post(
        url + `/pdf`,
        {
          ...order,
        },
        {
          responseType: "blob",
          headers: {
            Authorization: ` ${localStorage.token}`,
          },
        }
      )
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "quote.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((response) => console.log(333, response));

    reset(e);

    router.push("/reservations/orders");
    context.setLoading(false);
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
      supplierId: 0,
      cityId: 0,
      branchId: 0,
      salesPersonId: 0,
      exchange: "MXN",
    });
  };

  return (
    <Layout title="Crear Cotización">
      <div className="bg-gray-200" style={{ height: 650, width: "100%" }}>
        {context.loading ? <Loading /> : null}
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
                      value={order.fullName}
                      onChange={(e) => handleChange(e)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="amount"
                      label="Monto del pago"
                      type="number"
                      id="amount"
                      value={order.amount}
                      onChange={(e) => handleChange(e)}
                      autoComplete="amount"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="travelInfo"
                      label="Destino"
                      name="travelInfo"
                      value={order.travelInfo}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="reservationNumber"
                      label="Reservación"
                      name="reservationNumber"
                      value={order.reservationNumber}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="contactPhoneNum"
                      label="Teléfono de Contacto"
                      name="contactPhoneNum"
                      value={order.contactPhoneNum}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="contactEmail"
                      label="Correo de Contacto"
                      name="contactEmail"
                      value={order.contactEmail}
                      onChange={(e) => handleChange(e)}
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
                      value={order.emergencyContact}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="emergencyContactPhone"
                      label="Teléfono de Emergencia"
                      name="emergencyContactPhone"
                      value={order.emergencyContactPhone}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ width: 300 }}>
                      <InputLabel>Moneda</InputLabel>
                      <Select
                        id="exchange"
                        name="exchange"
                        value={order.exchange}
                        onChange={(e) => handleChange(e)}
                        label="exchange"
                      >
                        <MenuItem value="MXN">Pesos</MenuItem>
                        <MenuItem value="USD">Dolares</MenuItem>
                        <MenuItem value="EUR">Euros</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ width: 300 }}>
                      <InputLabel>Proveedor</InputLabel>
                      <Select
                        id="supplierId"
                        name="supplierId"
                        value={order.supplierId}
                        onChange={(e) => handleChange(e)}
                        label="Proveedor"
                      >
                        <MenuItem value=""></MenuItem>
                        {suppliers.map((supplier) => (
                          <MenuItem
                            key={supplier.supplierId}
                            value={supplier.supplierId}
                          >
                            {supplier.description}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl sx={{ width: 300 }}>
                      <InputLabel>Ciudad</InputLabel>
                      <Select
                        id="cityId"
                        name="cityId"
                        value={order.cityId}
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
                        value={order.branchId}
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
                  <Grid item xs={6}>
                    <FormControl sx={{ width: 300 }}>
                      <InputLabel>Vendedor Price Shoes</InputLabel>
                      <Select
                        id="salesPersonId"
                        name="salesPersonId"
                        value={order.salesPersonId}
                        onChange={(e) => handleChange(e)}
                        label="Vendedor Price Shoes"
                      >
                        <MenuItem value=""></MenuItem>
                        {salesPersons.map((sales) => (
                          <MenuItem key={sales.userId} value={sales.userId}>
                            {sales.fullName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} />

                  <Grid item xs={6}>
                    <input
                      accept="application/pdf"
                      type="file"
                      id="uploadFile"
                      name="uploadFile"
                      onChange={(e) => handleUploadfile(e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    {
                      //file null or undefined botton in grey
                      files64 ? (
                        <Button
                          color="secondary"
                          variant="contained"
                          fullWidth
                          onClick={fetchData}
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Cargar archivo
                        </Button>
                      ) : null
                    }
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
                  onClick={(e) => saveOrder(e)}
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
