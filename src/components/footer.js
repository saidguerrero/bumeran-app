import React from "react";
import Image from "next/image";
import logo_vb from "../img/logo_vb.png";

const Footer = () => {
  return (
    <footer>
      <div className=" width: 100% bg-gray-300 p-2 bg-center bg-cover ml-20 flex  items-center justify-end ">
        In Association with Viajes Bumeran
        <Image alt="Adjuntar archivos" src={logo_vb} width={50} height={50} />
      </div>
    </footer>
  );
};

export default Footer;
