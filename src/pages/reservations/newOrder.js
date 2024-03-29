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
import { dataDecrypt } from "@/utils/data-decrypt";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
  const [loading, setLoading] = useState(false);
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
    commissionId : "",
    artId : "",
    commission : 0,
  saleId: "", 
  serviceId: 0, 
  paymentTypeId: 0, 
  paymentMethodId: 0, 
  hotel: "", 
  numberOfPassengers: "", 
  salesNoteNumber: "",
  membershipNumber: "",
  startDate: "", 
  endDate: "", 
  paymentOption: "1"
  });
  const [suppliers, setSuppliers] = useState([]);
  const [cities, setCities] = useState([]);
  const [branches, setBranches] = useState([]);
  const [salesPersons, setSalesPersons] = useState([]);

  const [services, setServices] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentTypes, setPaymentTypes] = useState([]);
  
  const [paymentOption, setPaymentOption] = useState(1); 

  // Función para manejar el cambio en el radio button
  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
  };

  const configs = new Configs();
  const url = configs.current.URL_WS_TRAVEL_API;

  const fetchSuppliers = async () => {
    // console.log("********* entro sup **********");
    // console.log(url);
    //add header authorization token
    const response = await axios.get(url + `/supplier`, {
      headers: {
        Authorization: ` ${dataDecrypt(sessionStorage.getItem("token"))}`,
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
          Authorization: ` ${dataDecrypt(sessionStorage.getItem("token"))}`,
        },
      });

      const items = response.data;
      // console.log(items);
      setBranches(items.result.branches);
      setCities(items.result.cities);
      setSalesPersons(items.result.salesPersons);
      setSuppliers(items.result.suppliers);
      setServices(items.result.typeServices)
      setPaymentMethods(items.result.paymentMethods)
      setPaymentTypes(items.result.paymentTypes)
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
        Authorization: ` ${dataDecrypt(sessionStorage.getItem("token"))}`,
      },
    });
    const items = response.data;
    setSalesPersons(items.result);
  };

  const [role, setRole] = useState("");
  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      console.log("redirect ");
      router.push("/");
    }
    
    setLoading(true);
    setRole(dataDecrypt(sessionStorage.getItem("role")));
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // console.log(response.data);
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
    setLoading(true);
    // const response = await axios.get(
    //  url + `upload/readTest/${fileName}`
    // );

    try {
      const response = await axios.post(url + `/upload/readQuotePDF`, files64, {
        headers: {
          Authorization: ` ${dataDecrypt(sessionStorage.getItem("token"))}`,
        },
      });
      // console.log(response);
      const data = await response.data.result;
      setLoading(false);
      setOrder({
        id: data.id,
        fullName: data.fullName,
        amount: data.amount,
        travelInfo: data.travelInfo,
        supplier: data.supplier,
        reservationNumber: data.reservationNumber,
        city: 1,
        branch: data.branch,
        salesPerson: data.salesPerson,
        contactPhoneNum: data.contactPhoneNum,
        contactEmail: data.contactEmail,
        exchange: "MXN",
        commission: data.commission
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
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
    console.log(role);

    // console.log("userId = " + sessionStorage.getItem("userId"));

    if (role === "Vendedor") {
      order.salesPersonId = sessionStorage.getItem("userId");
    }

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
      !order.supplierId ||
      !order.commissionId ||
      !order.artId
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

    setLoading(true);

    const check = await axios.get(
      url + `/orders/checkReservation/${order.reservationNumber}`,
      {
        headers: {
          Authorization: ` ${dataDecrypt(sessionStorage.getItem("token"))}`,
        },
      }
    );

    if (check.data.result) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Número de reservación",
        text: "Número de reservación ya existe, verifique.",
      });
      return;
    }

    order.paymentOption = paymentOption;

    const response = await axios
      .post(
        url + `/pdf`,
        {
          ...order,
        },
        {
          responseType: "blob",
          headers: {
            Authorization: ` ${dataDecrypt(sessionStorage.getItem("token"))}`,
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
    setLoading(false);
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
      commissionId: "",
      artId: "",
      saleId: "", 
      serviceId: 0, 
      paymentTypeId: 0, 
      paymentMethodId: 0, 
      hotel: "", 
      numberOfPassengers: "", 
      salesNoteNumber: "",
      membershipNumber: "",
      startDate: "", 
      endDate: "", 
      paymentOption: 1,
    });
    setPaymentOption(1)
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
               
                display: "flex",
                flexDirection: "column",
                alignItems: "right",
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
                  rowSpacing={3}
                  columnSpacing={{ xs: 1, sm: 4, md: 4 }}
                
                >
                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="fullName"
                      label="Nombre del titular"
                      name="fullName"
                      autoComplete="fullName"
                      value={order.fullName}
                      onChange={(e) => handleChange(e)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={3}>
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

                  <Grid item xs={3}>
                    <FormControl sx={{ width: 200 }}>
                      <InputLabel>Servicio Adquirido</InputLabel>
                      <Select
                        id="serviceId"
                        name="serviceId"
                        value={order.serviceId}
                        onChange={(e) => handleChange(e)}
                        label="Servicio Adquirido"
                      >
                        <MenuItem value=""></MenuItem>
                        {services.map((item) => (
                          <MenuItem
                            key={item.serviceId}
                            value={item.serviceId}
                          >
                            {item.description}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="commission"
                      label="Comisión por Servicio"
                      type="number"
                      id="commission"
                      value={order.commission}
                      onChange={(e) => handleChange(e)}
                      autoComplete="commission"
                    />
                  </Grid>

                  <Grid item xs={3}>
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

                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="hotel"
                      label="Hotel"
                      name="hotel"
                      autoComplete="hotel"
                      value={order.hotel}
                      onChange={(e) => handleChange(e)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="reservationNumber"
                      label="Localizador"
                      name="reservationNumber"
                      value={order.reservationNumber}
                      onChange={(e) => handleChange(e)}
                    />

                    
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="contactPhoneNum"
                      label="Teléfono del titular"
                      name="contactPhoneNum"
                      value={order.contactPhoneNum}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>

                  <Grid item xs={3}>
                  

                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="numberOfPassengers"
                      label="Numero de pasajeros"
                      name="numberOfPassengers"
                      value={order.numberOfPassengers}
                      onChange={(e) => handleChange(e)}
                    />

                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="contactEmail"
                      label="Correo del titular"
                      name="contactEmail"
                      value={order.contactEmail}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="emergencyContact"
                      label="Nombre de Contacto de Emergencia"
                      name="emergencyContact"
                      value={order.emergencyContact}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>

                  <Grid item xs={3}>
                 

<TextField
                      margin="normal"
                      required
                      fullWidth
                      id="startDate"
                      label="Fecha de inicio"
                      name="startDate"
                      type="date"
                      value={order.startDate}
                      onChange={(e) => handleChange(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="emergencyContactPhone"
                      label="Teléfono de Contacto de Emergencia"
                      name="emergencyContactPhone"
                      value={order.emergencyContactPhone}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <FormControl sx={{ width: 200 }}>
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

                  <Grid item xs={3}>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="endDate"
                      label="Fecha de fin"
                      name="endDate"
                      type="date"
                      value={order.endDate}
                      onChange={(e) => handleChange(e)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl sx={{ width: 200 }}>
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

                  <Grid item xs={3}>
                    <FormControl sx={{ width: 200 }}>
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

                  <Grid item xs={3}>
                    <FormControl sx={{ width: 200 }}>
                      <InputLabel>Tipo de Pago del Cliente</InputLabel>
                      <Select
                        id="paymentTypeId"
                        name="paymentTypeId"
                        value={order.paymentTypeId}
                        onChange={(e) => handleChange(e)}
                        label="Tipo de Pago del Cliente"
                      >
                        <MenuItem value=""></MenuItem>
                        {paymentTypes.map((item) => (
                          <MenuItem
                            key={item.paymentTypeId}
                            value={item.paymentTypeId}
                          >
                            {item.description}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl sx={{ width: 200 }}>
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

                  <Grid item xs={3}>
                    <FormControl sx={{ width: 200 }}>
                      <InputLabel>ID Comisión</InputLabel>
                      <Select
                        id="commissionId"
                        name="commissionId"
                        value={order.commissionId}
                        onChange={(e) => handleChange(e)}
                        label="ID Comisión"
                      >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="301">301</MenuItem>
                        <MenuItem value="302">302</MenuItem>
                        <MenuItem value="303">303</MenuItem>
                        <MenuItem value="304">304</MenuItem>
                        <MenuItem value="305">305</MenuItem>
                        <MenuItem value="306">306</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl sx={{ width: 200 }}>
                      <InputLabel>Forma de Pago del Cliente</InputLabel>
                      <Select
                        id="paymentMethodId"
                        name="paymentMethodId"
                        value={order.paymentMethodId}
                        onChange={(e) => handleChange(e)}
                        label="Forma de Pago del Cliente"
                      >
                        <MenuItem value=""></MenuItem>
                        {paymentMethods.map((item) => (
                          <MenuItem
                            key={item.paymentMethodId}
                            value={item.paymentMethodId}
                          >
                            {item.description}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <FormControl sx={{ width: 200 }}>
                      <InputLabel>ID Art</InputLabel>
                      <Select
                        id="artId"
                        name="artId"
                        value={order.artId}
                        onChange={(e) => handleChange(e)}
                        label="ID Art"
                      >
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="01">01</MenuItem>
                        <MenuItem value="02">02</MenuItem>
                        <MenuItem value="03">03</MenuItem>
                        <MenuItem value="04">04</MenuItem>
                        <MenuItem value="05">05</MenuItem>
                        <MenuItem value="06">06</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="salesNoteNumber"
                      label="No Nota de Venta"
                      name="salesNoteNumber"
                      value={order.salesNoteNumber}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>


                  <Grid item xs={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="membershipNumber"
                      label="No de Socio"
                      name="membershipNumber"
                      value={order.membershipNumber}
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>


                  <Grid item xs={3}>
                    <FormControl sx={{ width: 200 }}>
                      {role === "Administrador" || role === "Root" ? (
                        <div>
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
                        </div>
                      ) : null}
                    </FormControl>
                  </Grid>
                  
               
                </Grid>
                <div className="flex items-center">
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
                  Guardar Cotización
                </button>
                {""}
                <RadioGroup
                  value={paymentOption}
                  onChange={handlePaymentOptionChange}
                  row
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    
                    label="Pago completo"
                  />
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Solo comisión"
                  />
                </RadioGroup>
                </div>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </Layout>
  );
}
