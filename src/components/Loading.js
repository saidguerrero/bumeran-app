import React from "react";

import Image from "next/image";

export default function Loading() {
  return (
    <div id="loading">
      <div className="backdropL modal-backdropL"></div>
      <div className="blockUIConfL modalL">
        <Image
          alt="Imagen Loading"
          className="blockUIConfL loading-imgL"
          src={"/spinner.svg"}
          width={100}
          height={100}
        />
      </div>
    </div>
  );
}
