import React, { useEffect, useState, useContext } from "react";

import { DataGrid } from "@mui/x-data-grid";
import Layout from "@/components/layout";
import Popup from "@/components/Popup";
import OrderInfo from "./orderInfo";
import { useRouter } from "next/router";
import axios from "axios";
import AppContext from "@/components/AppContext";
import Loading from "@/components/Loading";
import Image from "next/image";
import { Configs } from "@/Config";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

const Orders = () => {
  const context = useContext(AppContext);
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopupUF, setOpenPopupUF] = useState(false);

  const [contactPhoneNum, setContactPhoneNum] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [dolar, setDolar] = useState(0);
  const [euro, setEuro] = useState(0);
  const [search, setSearch] = useState("");

  const openModal = async (e, value) => {
    e.preventDefault();

    setContactPhoneNum(value.contactPhoneNum);
    setContactEmail(value.contactEmail);
    setEmergencyContactPhone(value.emergencyContactPhone);
    setEmergencyContact(value.emergencyContact);
    setOpenPopup(true);
  };

  const uploadFiles = async (e, row) => {
    e.preventDefault();
    context.setLoading(true);
    context.setOrderId(row.id);
    context.setCustomerFullname(row.fullName);
    context.setReservationNumber(row.reservationNumber);
    router.push("/reservations/addFiles");
  };

  const handleSearch = async (e) => {
    console.log("handleSearch");
    if (search !== undefined) {
      if (search?.length > 4) {
        const idUser = role === "Administrador" ? 0 : context.userId;
        const response = await axios.get(
          url +
            `/orders/pageOrders?search=${search}&id=${idUser}&page=1&size=100&roleId=${context.roleId}`,
          {
            headers: {
              Authorization: ` ${localStorage.token}`,
            },
          }
        );

        const items = response.data;
        // console.log(items.result);
        const data = items.result.data[0].orders;
        // console.log(data);
        setOrders(data);
      }
    }
  };

  const configs = new Configs();
  const url = configs.current.URL_WS_TRAVEL_API;

  const fetchOrders = async () => {
    context.setLoading(true);
    try {
      // console.log("fetchOrders");
      // console.log(role);
      // console.log(context.userId);
      // console.log(context.roleId);
      // const idUser = role === "Administrador" ? 0 : context.userId;
      const response = await axios.get(
        url +
          `/orders/pageOrders?id=${context.userId}&page=1&size=100&roleId=${context.roleId}`,
        {
          headers: {
            Authorization: ` ${localStorage.token}`,
          },
        }
      );
      // const response = await axios.get(url + `/orders`, {
      //   headers: {
      //     Authorization: ` ${localStorage.token}`,
      //   },
      // });
      console.log("********* Orders **********");

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
      console.log(items.result.dollar);
    } catch (error) {
      console.log(error);
    }
    context.setLoading(false);
  };
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState(0);
  useEffect(() => {
    // console.log("useEffect Orders");
    // console.log(context.role);
    // console.log(context.branch);
    // console.log(context.city);
    setRole(localStorage.getItem("role"));

    context.setLoading(false);
    fetchOrders();
  }, []);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const downloadFile = async (e, id, fileName) => {
    e.preventDefault();
    console.log("id");
    console.log(id);
    context.setLoading(true);

    const response = axios
      .get(url + `/upload/${id}`, {
        responseType: "blob",
        headers: {
          Authorization: ` ${localStorage.token}`,
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
    context.setLoading(false);
  };

  const columns = [
    {
      field: "reservationNumber",
      headerName: "Localizador",
      width: 120,
    },
    {
      field: "fullName",
      headerName: "Nombre",
      width: 200,
    },
    {
      field: "amount",
      headerName: "Precio",
      width: 90,
    },
    {
      field: "quoteStatus",
      headerName: "Pago del Cliente",
      width: 150,
    },
    { field: "paidStatus", headerName: " Pago VB", width: 110 },
    {
      field: "Adjuntar",
      renderCell: (cellValues) => {
        if (!cellValues.row.hasFiles) {
          return (
            <button
              class="hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={(event) => {
                uploadFiles(event, cellValues.row);
              }}
            >
              <Image
                alt="Adjuntar archivos"
                src={"/adjuntar.png"}
                width={35}
                height={35}
                title="Adjuntar archivos"
              />
            </button>
          );
        }
      },
    },

    {
      field: "Datos del Contacto",
      renderCell: (cellValues) => {
        return (
          <button
            class=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={(event) => {
              openModal(event, cellValues.row);
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
        );
      },
    },
    {
      field: "Ficha de Pago",
      renderCell: (cellValues) => {
        if (cellValues.row.hasFiles) {
          return (
            // si la propiedas hasFiles es falsa no se muestra el boton
            <button
              class=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={(event) => {
                downloadFile(
                  event,
                  cellValues.row.orderFileResponse.idPayOrder,
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
          );
        }
      },
    },
    {
      field: "Paquete",
      renderCell: (cellValues) => {
        if (cellValues.row.hasFiles) {
          return (
            // si la propiedas hasFiles es falsa no se muestra el boton
            <button
              class=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={(event) => {
                downloadFile(
                  event,
                  cellValues.row.orderFileResponse.idGeneralData,
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
          );
        }
      },
    },
    {
      field: "TerminosYCondiciones",
      renderCell: (cellValues) => {
        if (cellValues.row.hasFiles) {
          return (
            // si la propiedas hasFiles es falsa no se muestra el boton
            <button
              class=" hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick={(event) => {
                downloadFile(
                  event,
                  cellValues.row.orderFileResponse.idTermsAndConditions,
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
          );
        }
      },
    },
  ];

  return (
    <Layout title="Reservaciones">
      <div className="bg-gray-200">
        {context.loading ? <Loading /> : null}
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
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={orders}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
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
      </div>
    </Layout>
  );
};

export default Orders;
