import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Swal from "sweetalert2";
import Layout from "@/components/layout";
import axios from "axios";
import AppContext from "@/components/AppContext";
import Loading from "@/components/Loading";
import { Configs } from "@/Config";
import { dataDecrypt } from "@/utils/data-decrypt";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function AddFiles(props) {
  const router = useRouter();
  const context = useContext(AppContext);
  const { orderId, setOpenPopup } = props;

  const [loading, setLoading] = useState(false);
  const [orderFiles, setOrderFiles] = useState([]);
  let filesToSave = [];

  const columns = [
    {
      field: "name",
      headerName: "Nombre del archivo",
      width: 200,
    },
    {
      field: "size",
      headerName: "Tamaño",
      width: 150,
    },
  ];

  const [customerFullname, setCustomerFullname] = useState("");
  const [reservationNumber, setReservationNumber] = useState("");
  useEffect(() => {
    setCustomerFullname(sessionStorage.getItem("customerFullname"));
    setReservationNumber(sessionStorage.getItem("reservationNumber"));
  }, []);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });

  const [filePayOrder, setFilePayOrder] = useState("");

  const handleFilePayOrder = async (event) => {
    event.preventDefault();
    // console.log("si entro a handleFilePayOrder");
    let allFiles = event?.target?.files?.length;
    let newFiles = [];
    let arrayFiles64 = [];
    if (allFiles > 2) {
      return;
    } else if (allFiles > 0) {
      for (let i = 0; i < allFiles; i++) {
        arrayFiles64.push(await toBase64(event.target.files[i]));
        newFiles.push(event.target.files[i]);
      }

      setFilePayOrder(arrayFiles64);
    }
    // console.log("arrayFiles64");
    // console.log(arrayFiles64);
    // console.log(filePayOrder);

    if (filePayOrder !== "") {
      const uploadFiles = {
        file: filePayOrder,
        fileName: "Orden de pago",
        fileExtension: "pdf",
        fileTypeId: 1,
      };
      orderFiles.push(uploadFiles);

      // filesToSave.push({ id: 1, name: "Orden de pago", size: "1.2 MB" });

      // const temp = {
      //   name: filePayOrder.name,
      //   size: filePayOrder.size,
      // };
      // filesToSave = [...filesToSave, temp];
      // console.log("filesToSave");
      // console.log(filesToSave);
    }
  };

  const [fileTravelServices, setFileTravelServices] = useState("");
  const handleFileTravelServices = async (event) => {
    event.preventDefault();
    let allFiles = event?.target?.files?.length;
    let newFiles = [];
    let arrayFiles64 = [];
    if (allFiles > 2) {
      return;
    } else if (allFiles > 0) {
      for (let i = 0; i < allFiles; i++) {
        arrayFiles64.push(await toBase64(event.target.files[i]));
        newFiles.push(event.target.files[i]);
      }

      setFileTravelServices(arrayFiles64);
    }
    // console.log("arrayFiles64");
    // console.log(arrayFiles64);
    // console.log(fileTravelServices);
    if (fileTravelServices !== "") {
      const uploadFiles = {
        file: fileTravelServices,
        fileName: "Datos Generales",
        fileExtension: "pdf",
        fileTypeId: 2,
      };
      orderFiles.push(uploadFiles);

      // const temp = {
      //   name: filePayOrder.name,
      //   size: filePayOrder.size,
      // };
      // filesToSave = [...filesToSave, temp];
      // console.log("filesToSave");
      // console.log(filesToSave);
    }
  };

  const [fileTerms, setFileTerms] = useState("");
  const handleFileTermsAndConditions = async (event) => {
    event.preventDefault();
    let allFiles = event?.target?.files?.length;
    let newFiles = [];
    let arrayFiles64 = [];
    if (allFiles > 2) {
      return;
    } else if (allFiles > 0) {
      for (let i = 0; i < allFiles; i++) {
        arrayFiles64.push(await toBase64(event.target.files[i]));
        newFiles.push(event.target.files[i]);
      }

      setFileTerms(arrayFiles64);
    }
    // console.log("arrayFiles64");
    // console.log(arrayFiles64);
    // console.log(fileTerms);
    if (fileTerms !== "") {
      const uploadFiles = {
        file: fileTerms,
        fileName: "Terminos y condiciones",
        fileExtension: "pdf",
        fileTypeId: 3,
      };
      orderFiles.push(uploadFiles);
    }
  };

  const [fileConfServices, setFileConfServices] = useState("");
  const handleFileConfServices = async (event) => {
    event.preventDefault();
    let allFiles = event?.target?.files?.length;
    let newFiles = [];
    let arrayFiles64 = [];
    if (allFiles > 2) {
      return;
    } else if (allFiles > 0) {
      for (let i = 0; i < allFiles; i++) {
        arrayFiles64.push(await toBase64(event.target.files[i]));
        newFiles.push(event.target.files[i]);
      }

      setFileConfServices(arrayFiles64);
    }
    // console.log("arrayFiles64");
    // console.log(arrayFiles64);
    // console.log(fileConfServices);
    if (fileConfServices !== "") {
      const uploadFiles = {
        file: fileConfServices,
        fileName: "Confirmación de Servicios",
        fileExtension: "pdf",
        fileTypeId: 4,
      };
      orderFiles.push(uploadFiles);
    }
  };

  const configs = new Configs();
  const url = configs.current.URL_WS_TRAVEL_API;
  // const url =
  //   "https://racial-letter-production.up.railway.app/travelagency/api/v1";

  const saveFiles = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("******* entro save files *********");
    // console.log(orderId);
    // console.log(orderFiles);

    // if (
    //   !filePayOrder ||
    //   !fileTerms ||
    //   !fileTravelServices ||
    //   !fileConfServices
    // ) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error en validación",
    //     text: "Debe de adjuntar todos los archivos",
    //   });
    //   setLoading(false);
    //   return;
    // }

    const data = {
      orderId: sessionStorage.getItem("orderId"),
      uploadFiles: orderFiles,
    };
    try {
      // add "Access-Control-Allow-Origin", "*" to headers
      const response = await axios.post(url + `/upload/aditional`, data, {
        headers: {
          Authorization: ` ${dataDecrypt(sessionStorage.getItem("token"))}`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    // console.log(response);

    resetFiles(e);
    setLoading(false);
    router.push("/reservations/orders");

    // setOpenPopup(false);
  };

  const resetFiles = (e) => {
    e.preventDefault();
    setFilePayOrder("");
    setFileTravelServices("");
    setFileTerms("");
    setOrderFiles([]);
  };

  return (
    <Layout title="Adjuntar archivo">
      {loading ? <Loading /> : null}
      <div className="bg-gray-200" style={{ height: 650 }}>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="md">
            <div className="container flex flex-col items-center justify-center ">
              <br />
              <br />
              <h4 className="text-base text-gray-900 group-hover:text-gray-900 font-semibold">
                Nombre del cliente: {customerFullname}
              </h4>
              <h4 className="text-base text-gray-900 group-hover:text-gray-900 font-semibold">
                Reservación: {reservationNumber}
              </h4>
            </div>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 3,
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
                      type="file"
                      fullWidth
                      id="filePayOrder"
                      name="filePayOrder"
                      onChange={(e) => handleFilePayOrder(e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <button
                      className="mt-7 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      onClick={(event) => {
                        handleFilePayOrder(event);
                      }}
                    >
                      Adjuntar orden de pago
                    </button>
                  </Grid>
                  <br />
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      type="file"
                      fullWidth
                      id="fileTravelServices"
                      name="fileTravelServices"
                      onChange={(e) => handleFileTravelServices(e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <button
                      className="mt-7 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      onClick={(event) => {
                        handleFileTravelServices(event);
                      }}
                    >
                      Adjuntar datos generales
                    </button>
                  </Grid>
                  <br />
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      type="file"
                      fullWidth
                      id="fileTerms"
                      name="fileTerms"
                      onChange={(e) => handleFileTermsAndConditions(e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <button
                      className="mt-7
                    rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      onClick={(event) => {
                        handleFileTermsAndConditions(event);
                      }}
                    >
                      {" "}
                      Adjuntar terminos y condiciones firmados
                    </button>
                  </Grid>{" "}
                  <br />
                  <Grid item xs={6}>
                    <TextField
                      margin="normal"
                      type="file"
                      fullWidth
                      id="fileConfServices"
                      name="fileConfServices"
                      onChange={(e) => handleFileConfServices(e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <button
                      className="mt-7
                    rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                      onClick={(event) => {
                        handleFileConfServices(event);
                      }}
                    >
                      {" "}
                      Adjuntar Confirmación de Servicios
                    </button>
                  </Grid>
                </Grid>
                <br />
                {/* <div style={{ height: 200, width: "60%" }}>
                  <DataGrid rows={filesToSave} columns={columns} />
                </div> */}
                <br />
                <button
                  onClick={resetFiles}
                  className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 mr-5"
                >
                  Cancelar
                </button>
                {""}
                <button
                  onClick={saveFiles}
                  className="ml-5 rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Guardar archivos
                </button>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </Layout>
  );
}
