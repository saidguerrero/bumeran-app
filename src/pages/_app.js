import "@/styles/globals.css";
import React, { useState, createContext, useEffect } from "react";
export const AppContext = createContext("");

export default function App({ Component, pageProps }) {
  return (
    <AppContext.Provider>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
