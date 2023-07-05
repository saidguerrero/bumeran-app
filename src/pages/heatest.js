import Image from "next/image";
import React, { useContext } from "react";
import bumeran from "../img/bumeran_white.svg";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";
import AppContext from "@/components/AppContext";
import priceShoesLogo from "../img/priceShoesLogo.png";
import { Tab } from "@mui/material";

export default function Header() {
  const context = useContext(AppContext);
  return (
    <header>
      <table border="1">
        <tr>
          {" "}
          <td>
            {" "}
            <Image alt="Bumeran" src={priceShoesLogo} width={100} height={30} />
          </td>
        </tr>
      </table>
      <Image alt="Bumeran" src={priceShoesLogo} width={100} height={30} />
      <div className="container flex flex-col items-center justify-center ">
        <nav>
          <div>
            <h3 className="text-base text-blue-900 group-hover:text-gray-900 font-semibold">
              Módulo: {context.branch}
            </h3>
          </div>
        </nav>
        <nav>
          <div>
            <h3 className="text-base text-blue-900 group-hover:text-gray-900 font-semibold">
              Usuario: {context.userFullName}
            </h3>
          </div>
        </nav>
      </div>
    </header>
  );
}
