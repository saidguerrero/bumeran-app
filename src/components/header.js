import Image from "next/image";
import React, { useContext } from "react";
import Link from "next/link";
import AppContext from "@/components/AppContext";

export default function Header() {
  const context = useContext(AppContext);
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
                Bienvenido {context.userFullName}
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
                {context.currentDate}
              </h3>
            </div>
          </nav>
          <nav>
            <div>
              <h3 className="text-base text-blue-900 group-hover:text-gray-900 font-semibold">
                Ciudad: {context.city ? context.city : "Admin"}
              </h3>
            </div>
          </nav>
          <nav>
            <div>
              <h3 className="text-base text-blue-900 group-hover:text-gray-900 font-semibold">
                Módulo: {context.branch ? context.branch : "Admin"}
              </h3>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
