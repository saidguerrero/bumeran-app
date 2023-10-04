import React, { useEffect, useState, useContext } from "react";

import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import Layout from "@/components/layout";
import Popup from "@/components/Popup";
import OrderInfo from "./orderInfo";
import UpdateQuoteStatus from "./updateQuoteStatus";
import { useRouter } from "next/router";
import axios from "axios";
import AppContext from "@/components/AppContext";
import Loading from "@/components/Loading";
import Image from "next/image";
import { Configs } from "@/Config";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { data } from "autoprefixer";
import { dataDecrypt } from "@/utils/data-decrypt";
import Link from "next/link";

const Orders = () => {
  const context = useContext(AppContext);
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);

  const [contactPhoneNum, setContactPhoneNum] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [dolar, setDolar] = useState(0);
  const [euro, setEuro] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [openStatusPopup, setOpenStatusPopup] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [statusId, setStatusId] = useState(0);

  const openModal = async (e, value) => {
    e.preventDefault();

    setContactPhoneNum(value.contactPhoneNum);
    setContactEmail(value.contactEmail);
    setEmergencyContactPhone(value.emergencyContactPhone);
    setEmergencyContact(value.emergencyContact);
    setOpenPopup(true);
  };

  const openStatusModal = async (e, value) => {
    e.preventDefault();
    setOpenStatusPopup(true);
    console.log(value);
    setOrderId(value.id);
  };

  const uploadFiles = async (e, row) => {
    e.preventDefault();
    setLoading(true);

    sessionStorage.setItem("reservationNumber", row.reservationNumber);
    sessionStorage.setItem("orderId", row.id);
    sessionStorage.setItem("customerFullname", row.fullName);
    setLoading(false);
    router.push("/reservations/addFiles");
  };

  const handleSearch = async (e) => {
    // console.log("handleSearch");
    if (search !== undefined) {
      if (search?.length > 4) {
        const idUser =
          role === "Administrador" ? 0 : sessionStorage.getItem("userId");
        const roleId = sessionStorage.getItem("roleId");
        const token = dataDecrypt(sessionStorage.getItem("token"));
        const response = await axios.get(
          url +
            `/orders/pageOrders?search=${search}&id=${idUser}&page=1&size=100&roleId=${roleId}`,
          {
            headers: {
              Authorization: ` ${token}`,
            },
          }
        );

        const items = response.data;
        // console.log(items.result);
        const data = items.result.data[0].orders;
        // console.log(data[0]);
        setOrders(data);
      }
    }
  };

  const configs = new Configs();
  const url = configs.current.URL_WS_TRAVEL_API;

  const fetchOrders = async () => {
    setLoading(true);
    try {
      // console.log("fetchOrders");
      // console.log(role);
      // console.log(context.userId);
      // console.log(context.roleId);
      // const idUser = role === "Administrador" ? 0 : context.userId;
      const idUser = sessionStorage.getItem("userId");
      // console.log(idUser);
      const roleId = sessionStorage.getItem("roleId");
      // console.log(roleId);
      const token = dataDecrypt(sessionStorage.getItem("token"));
      // console.log(token);

      const response = await axios.get(
        url +
          `/orders/pageOrders?id=${idUser}&page=1&size=100&roleId=${roleId}`,
        {
          headers: {
            Authorization: ` ${token}`,
          },
        }
      );
      // const response = await axios.get(url + `/orders`, {
      //   headers: {
      //     Authorization: ` ${localStorage.token}`,
      //   },
      // });
      // console.log("********* Orders **********");

      // ***** dummy data
      // const items = data;

      // console.log(items);
      const items = response.data;
      // console.log(items.result);
      // console.log(items.result.data);
      const data = items.result.data[0];
      // console.log(data);
      setOrders(data.orders);
      setDolar(data.dollar);
      setEuro(data.euro);
      // setOrders(response.result);
      // console.log("orders**************");
      // console.log(items.result.dollar);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    // console.log("useEffect Orders");
    // console.log(context.role);
    // console.log(context.branch);
    // console.log(context.city);
    if (sessionStorage.getItem("token") === null) {
      console.log("redirect ");
      router.push("/");
    }
    setLoading(true);
    setRole(dataDecrypt(sessionStorage.getItem("role")));

    // console.log("useEffect Orders");
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateTempOrder = async (e, id, statusId, status) => {
    e.preventDefault();
    // console.log("SI ENTRO !! updateTempOrder");
    // console.log("status en updateTempOrder" + status);
    //setLoading(true);
    const objIndex = orders.findIndex((obj) => obj.id === id);
    // console.log(objIndex);
    // console.log(orders[objIndex]);
    orders[objIndex].statusId = statusId;
    orders[objIndex].quoteStatus = status;
    // console.log(orders);

    // console.log("After update: ", myArray[objIndex]);
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const downloadFile = async (e, id, fileName) => {
    e.preventDefault();
    setLoading(true);
    // console.log("id");
    // console.log(id);

    const token = dataDecrypt(sessionStorage.getItem("token"));
    const url2 =
      "https://racial-letter-production.up.railway.app/travelagency/api/v1";
    const response = axios
      .get(url2 + `/upload/${id}`, {
        responseType: "blob",
        headers: {
          Authorization: ` ${token}`,
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName + "_" + id + ".pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((response) => console.log(333, response));

    setLoading(false);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const blue = {
    50: "#F0F7FF",
    200: "#A5D8FF",
    400: "#3399FF",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E7EBF0",
    200: "#E0E3E7",
    300: "#CDD2D7",
    400: "#B2BAC2",
    500: "#A0AAB4",
    600: "#6F7E8C",
    700: "#3E5060",
    800: "#2D3843",
    900: "#1A2027",
  };

  const Root = styled("div")(
    ({ theme }) => `
    table {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      border-collapse: collapse;
      width: 100%;
    }
  
    td,
    th {
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      text-align: left;
      padding: 6px;
    }
  
    th {
      background-color: ${
        theme.palette.mode === "dark" ? blue[900] : blue[200]
      };
    }
    `
  );

  const CustomTablePagination = styled(TablePagination)(
    ({ theme }) => `
    & .${classes.spacer} {
      display: none;
    }
  
    & .${classes.toolbar}  {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
  
      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }
  
    & .${classes.selectLabel} {
      margin: 0;
    }
  
    & .${classes.select}{
      padding: 2px;
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      border-radius: 50px;
      background-color: transparent;
  
      &:hover {
        background-color: ${
          theme.palette.mode === "dark" ? grey[800] : grey[50]
        };
      }
  
      &:focus {
        outline: 1px solid ${
          theme.palette.mode === "dark" ? blue[400] : blue[200]
        };
      }
    }
  
    & .${classes.displayedRows} {
      margin: 0;
  
      @media (min-width: 768px) {
        margin-left: auto;
      }
    }
  
    & .${classes.actions} {
      padding: 2px;
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[800] : grey[200]
      };
      border-radius: 50px;
      text-align: center;
    }
  
    & .${classes.actions} > button {
      margin: 0 8px;
      border: transparent;
      border-radius: 2px;
      background-color: transparent;
  
      &:hover {
        background-color: ${
          theme.palette.mode === "dark" ? grey[800] : grey[50]
        };
      }
  
      &:focus {
        outline: 1px solid ${
          theme.palette.mode === "dark" ? blue[400] : blue[200]
        };
      }
    }
    `
  );

  return (
    <Layout title="Reservaciones">
      <div className="bg-gray-200">
        {loading ? <Loading /> : null}
        <div className="container flex flex-col items-end justify-center ">
          <br />
          <h4 className="text-base text-gray-900 group-hover:text-gray-900 font-semibold">
            1 USD = {dolar} MXN
          </h4>
          <h4 className="text-base text-gray-900 group-hover:text-gray-900 font-semibold">
            1 EUR = {euro} MXN
          </h4>
        </div>
        <div className="  pl-80 ">
          <TextField
            margin="normal"
            required
            id="search"
            placeholder="Buscar por Localizador o Nombre"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="w-96"
          />
          {search?.length > 4 ? (
            <button
              onClick={(e) => handleSearch(e)}
              className="ml-10 rounded-md bg-blue-900 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Buscar
            </button>
          ) : null}
        </div>

        <main className=" flex pl-60 pr-5 py-1">
          <Root sx={{ width: 1500, maxWidth: "100%" }}>
            <table aria-label="custom pagination table">
              <thead>
                <tr>
                  <th>Localizador</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Pago del Cliente</th>
                  <th>Adjuntar</th>

                  <th>Datos del Contacto</th>
                  <th>Ficha de Pago</th>
                  <th>Paquete</th>
                  <th>Terminos Y Condiciones</th>
                  <th>Confirmación de Servicios</th>
                </tr>
              </thead>
              <tbody>
                {(rowsPerPage > 0
                  ? orders.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : orders
                ).map((row) => (
                  <tr key={row.id}>
                    <td style={{ width: 200 }}>{row.reservationNumber}</td>
                    <td style={{ width: 200 }} align="right">
                      {row.fullName}
                    </td>
                    <td style={{ width: 150 }} align="right">
                      {row.amount}
                    </td>

                    <td style={{ width: 120 }} align="right">
                      <button
                        class="hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        onClick={(event) => {
                          openStatusModal(event, row);
                        }}
                        disabled={row.statusId !== 1}
                      >
                        {row.quoteStatus}
                      </button>
                    </td>

                    <td style={{ width: 100 }} align="right">
                      {!row.hasFiles ? (
                        <button
                          class="hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                          onClick={(event) => {
                            uploadFiles(event, row);
                          }}
                        >
                          <Image
                            alt="Adjuntar archivos"
                            src={"/Adjuntar.png"}
                            width={35}
                            height={35}
                            title="Adjuntar archivos"
                          />
                        </button>
                      ) : null}
                    </td>

                    <td style={{ width: 120 }} align="right">
                      {
                        <button
                          class=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                          onClick={(event) => {
                            openModal(event, row);
                          }}
                        >
                          <Image
                            alt="Datos de Contacto"
                            src={"/datosContacto.png"}
                            width={35}
                            height={35}
                            title="Datos de Contacto"
                          />
                        </button>
                      }
                    </td>

                    <td style={{ width: 120 }} align="right">
                      {row.hasFiles ? (
                        <button
                          class=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                          onClick={(event) => {
                            downloadFile(
                              event,
                              row.orderFileResponse.idPayOrder,
                              "fichaPago"
                            );
                          }}
                        >
                          <Image
                            alt="Ficha de Pago"
                            src={"/fichaPago.png"}
                            width={35}
                            height={35}
                            title="Ficha de Pago"
                          />
                        </button>
                      ) : null}
                    </td>

                    <td style={{ width: 120 }} align="right">
                      {row.hasFiles ? (
                        <button
                          class=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                          onClick={(event) => {
                            downloadFile(
                              event,
                              row.orderFileResponse.idGeneralData,
                              "Paquete"
                            );
                          }}
                        >
                          <Image
                            alt="Paquete"
                            src={"/paquete.png"}
                            width={35}
                            height={35}
                            title="Paquete"
                          />
                        </button>
                      ) : null}
                    </td>

                    <td style={{ width: 120 }} align="right">
                      {row.hasFiles ? (
                        <button
                          class=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                          onClick={(event) => {
                            downloadFile(
                              event,
                              row.orderFileResponse.idTermsAndConditions,
                              "TerminosYCondiciones"
                            );
                          }}
                        >
                          <Image
                            alt="Terminos Y Condiciones"
                            src={"/terminosyCondiciones.png"}
                            width={35}
                            height={35}
                            title="Terminos Y Condiciones"
                          />
                        </button>
                      ) : null}
                    </td>
                    <td style={{ width: 120 }} align="right">
                      {row.hasFiles ? (
                        <button
                          class=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                          onClick={(event) => {
                            downloadFile(
                              event,
                              row.orderFileResponse.idConditionsOfServices,
                              "CondicionesDelServicio"
                            );
                          }}
                        >
                          <Image
                            alt="Condiciones del servicio"
                            src={"/confirmacion.png"}
                            width={35}
                            height={35}
                            title="Condiciones del servicio"
                          />
                        </button>
                      ) : null}
                    </td>
                  </tr>
                ))}

                {emptyRows > 0 && (
                  <tr style={{ height: 34 * emptyRows }}>
                    <td colSpan={5} />
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <CustomTablePagination
                    rowsPerPageOptions={[5]}
                    colSpan={5}
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    slotProps={{
                      select: {
                        "aria-label": "rows per page",
                      },
                      actions: {
                        showFirstButton: true,
                        showLastButton: true,
                      },
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </tr>
              </tfoot>
            </table>
          </Root>
        </main>
        <Popup
          title="Datos Generales"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <OrderInfo
            contactPhoneNum={contactPhoneNum}
            contactEmail={contactEmail}
            emergencyContactPhone={emergencyContactPhone}
            emergencyContact={emergencyContact}
          />
        </Popup>

        <Popup
          title="Pago del Cliente"
          openPopup={openStatusPopup}
          setOpenPopup={setOpenStatusPopup}
        >
          <UpdateQuoteStatus
            orderId={orderId}
            statusId={"1"}
            setOpenStatusPopup={setOpenStatusPopup}
            updateTempOrder={updateTempOrder}
          />
        </Popup>
      </div>
    </Layout>
  );
};

export default Orders;
