import React, { useEffect, useState, useContext } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { Disclosure } from "@headlessui/react";
import { MdOutlineSettings, MdOutlineLogout } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { HiOutlineDatabase } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import AppContext from "./AppContext";
import { useRouter } from "next/router";

const SideNavbar = () => {
  const context = useContext(AppContext);
  const router = useRouter();
  const openOrders = () => {
    context.setLoading(true);
  };

  const [role, setRole] = useState("");

  useEffect(() => {
    // Perform localStorage action
    setRole(localStorage.getItem("role"));
  }, []);
  return (
    <div>
      <Disclosure as="nav">
        <Disclosure.Button
          className="absolute top-4 right-4 inline-flex items-center
    peer justify-center rounded-md p-2 text-gray-900 hover:text-white focus:outline-none focus:ring-inset
    focus:rind-white group hover:bg-gray-900"
        >
          <MenuIcon className="block md:hidden h-6 w-6" aria-hidden="true" />
        </Disclosure.Button>
        <div className="fixed top-25 left-0 h-screen w-60 bg-blue-900 z-20 p-6 flex flex-col justify-start items-center">
          <div className="flex flex-col justify-start items-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full "></h1>
            <div className="my-4 border-b border-gray-100 pb-4 w-full">
              {/* otro icono */}
              <Link href="/reservations/orders" onClick={openOrders}>
                <div
                  className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-white p-2 rounded-md 
                group cursor-pointer hover:shadow-lg m-auto"
                >
                  <Image
                    alt="Cerrar Sesión"
                    src={"/reservaciones.png"}
                    width={25}
                    height={25}
                    className="text-2x1 text-white group-hover:text-blue-900"
                  />
                  <h3 className="text-base text-white group-hover:text-blue-900 font-semibold">
                    Reservaciones
                  </h3>
                </div>
              </Link>
              {/* hasta aqui */}
              <Link href="/reservations/newOrder">
                <div
                  className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-white p-2 rounded-md 
                group cursor-pointer hover:shadow-lg m-auto"
                >
                  {/* need icons */}

                  <Image
                    alt="Cerrar Sesión"
                    src={"/cotizacion.png"}
                    width={25}
                    height={25}
                    className="text-2x1 text-white group-hover:text-blue-900"
                  />
                  <h3 className="text-base text-white group-hover:text-blue-900 font-semibold">
                    Crear Cotización
                  </h3>
                </div>
              </Link>
            </div>
            {/* setting & more */}
            <div className="my-4 border-b border-gray-100 pb-4 w-full">
              {role === "Administrador" || role === "Root" ? (
                <Link href="/reservations/dolar">
                  <div
                    className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-white p-2 rounded-md 
                group cursor-pointer hover:shadow-lg m-auto"
                  >
                    {/* need icons */}
                    <Image
                      alt="dolar"
                      src={"/dolar.png"}
                      width={25}
                      height={25}
                      className="text-2x1 text-white group-hover:text-blue-900"
                    />
                    <h3 className="text-base text-white group-hover:text-blue-900 font-semibold">
                      Precio Dolar
                    </h3>
                  </div>
                </Link>
              ) : null}

              {role === "Administrador" || role === "Root" ? (
                <Link href="/reservations/euro">
                  <div
                    className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-white p-2 rounded-md 
                group cursor-pointer hover:shadow-lg m-auto"
                  >
                    {/* need icons */}
                    <Image
                      alt="euro"
                      src={"/dolar.png"}
                      width={25}
                      height={25}
                      className="text-2x1 text-white group-hover:text-blue-900"
                    />
                    <h3 className="text-base text-white group-hover:text-blue-900 font-semibold">
                      Precio Euro
                    </h3>
                  </div>
                </Link>
              ) : null}
            </div>

            {/* logout */}
            <div className="my-4 w-full">
              {/* otro icono */}
              <Link href="/">
                <div
                  className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-white p-2 rounded-md 
                group cursor-pointer hover:shadow-lg m-auto"
                >
                  {/* need icons */}
                  <Image
                    alt="Cerrar Sesión"
                    src={"/cerrarSesion.png"}
                    width={25}
                    height={25}
                    className="text-2x1 text-white group-hover:text-blue-900"
                  />

                  <h3 className="text-base text-white group-hover:text-blue-900 font-semibold">
                    Cerrar Sesión
                  </h3>
                </div>
              </Link>
              {/* hasta aqui */}
            </div>
          </div>
        </div>
      </Disclosure>
    </div>
  );
};

export default SideNavbar;
