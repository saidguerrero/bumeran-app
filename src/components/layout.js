import React from "react";
import Head from "next/head";
import Header from "./header";
import SideNavbar from "./SideNavbar";
import Footer from "./footer";

const Layout = ({ children, title = "viajes Bumeran", description = "" }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Header />
      <SideNavbar />
      {/* <Sidebar /> */}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
