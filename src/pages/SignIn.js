import React, { useState, createContext, useContext } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import axios from "axios";
import { Configs } from "@/Config";
import { dataEncrypt } from "@/utils/data-encrypt";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit">DEVAS</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [serverCart, setServerCart] = useState([]);
  const [cart, setCart] = useState(["1", "3"]);

  return (
    <section className="mb-6 md:mb-10 md:flex-col md:mx-10 gap-10">
      {/* <NextHead>
        <title>hola carrito title</title>
      </NextHead> */}
      {console.log(cart)}
      {cart?.length > 0 ? (
        <div className="flex flex-col">
          {/* <PageTitle title="titulo carrito" className="mx-6 mb-6 md:mx-0" /> */}

          <div className="flex flex-col gap-10 md:flex-row lg:gap-14">
            <div className="flex flex-col md:w-9/12 gap-4">
              <div className="flex flex-col gap-1 md:gap-6">
                <div
                  className="flex justify-end text-base font-semibold text-certus-brand-purple cursor-pointer pr-5 md:pr-0"
                  data-test-id="cart-vaciar-carrito"
                >
                  limpiar carrito
                </div>

                {/* <CartProducts
                  currency={serverCart?.currency}
                  items={serverCart?.items}
                  title={t("Cart.title")}
                /> */}
              </div>

              <div className="flex justify-center text-base font-semibold text-certus-brand-purple md:justify-end">
                {/* <PDFGenerate locale={locale} /> */}
                generar pdf
              </div>
            </div>

            <div className="px-6 md:w-3/12 md:px-0 md:pt-11 flex">
              {/* <CartTotals /> */}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
