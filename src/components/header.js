import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import AppContext from "@/components/AppContext";
import { dataDecrypt } from "@/utils/data-decrypt";

export default function Header() {
  const context = useContext(AppContext);
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [city, setCity] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    // if (role != "Administrador" && role != "Root") {
    //   router.push("/reservations/orders");
    // }
    setBranch(sessionStorage.getItem("branch"));
    setCity(sessionStorage.getItem("city"));
    setRole(dataDecrypt(sessionStorage.getItem("role")));
    setUserFullName(dataDecrypt(sessionStorage.getItem("userFullName")));
    setCurrentDate(sessionStorage.getItem("currentDate"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <header>
      <div className=" flex justify-between items-center p-4">
        <div className="container flex flex-col items-start justify-center ">
          <Image
            alt="Bumeran"
            src={"/priceShoesLogo.png"}
            width={100}
            height={30}
          />
        </div>

        <div className="container flex flex-col items-center justify-center ">
          <nav>
            <div>
              <h3 className="text-base text-blue-900 group-hover:text-gray-900 font-semibold">
                Bienvenido {userFullName}
              </h3>
            </div>
          </nav>
          <nav>
            <div>
              <h3 className="text-base text-blue-900 group-hover:text-gray-900 font-semibold">
                SAM
              </h3>
            </div>
          </nav>
        </div>

        <div className="container flex flex-col items-end justify-end ">
          <nav>
            <div>
              <h3 className="text-base text-blue-900 group-hover:text-gray-900 font-semibold">
                {currentDate}
              </h3>
            </div>
          </nav>
          <nav>
            <div>
              <h3 className="text-base text-blue-900 group-hover:text-gray-900 font-semibold">
                Ciudad: {city ? city : "Admin"}
              </h3>
            </div>
          </nav>
          <nav>
            <div>
              <h3 className="text-base text-blue-900 group-hover:text-gray-900 font-semibold">
                Módulo: {branch ? branch : "Admin"}
              </h3>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
