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
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Header />
        <SideNavbar />
        {/* <Sidebar /> */}
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
