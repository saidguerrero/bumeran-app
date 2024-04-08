import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import Layout from "@/components/layout";
import AppContext from "@/components/AppContext";
import Loading from "@/components/Loading";
import axios from "axios";
import { Configs } from "@/Config";
import { dataDecrypt } from "@/utils/data-decrypt";
// import '@/styles/global.css';
import Image from "next/image";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(10),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

export default function Help() {


  return (

    <Layout title="Actualizar Precio Dolar">
    <div className="bg-gray-200 " style={{ height: 750 }}>
     
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">

        <div className="flex justify-center items-center h-screen bg-gray-100 ml-20 py-20">
            <div className="bg-cover bg-center h-full w-full" >
                {/* Contenido de tu componente */}
                <Image
                    alt="Ordenes"
                    src={"/help.jpg"}
                    width={1000}
                    height={2000}
                   
                  />
            </div>
        </div>
    </Container>
        </ThemeProvider>
      </div>
    </Layout>
);
}
