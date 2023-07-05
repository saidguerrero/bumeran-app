import "@/styles/globals.css";
import React, { useState, createContext, useEffect } from "react";
import AppContext from "@/components/AppContext";

export default function App({ Component, pageProps }) {
  const [userFullName, setUserFullName] = useState("");
  const [city, setCity] = useState("");
  const [branch, setBranch] = useState("");
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [customerFullname, setCustomerFullname] = useState("");
  const [reservationNumber, setReservationNumber] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [roleId, setRoleId] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsLogged(true);
    }
  }, []);
  return (
    <AppContext.Provider
      value={{
        isLogged,
        setIsLogged,
        userFullName,
        setUserFullName,
        city,
        setCity,
        branch,
        setBranch,
        userId,
        setUserId,
        loading,
        setLoading,
        orderId,
        setOrderId,
        customerFullname,
        setCustomerFullname,
        reservationNumber,
        setReservationNumber,
        currentDate,
        setCurrentDate,
        role,
        setRole,
        roleId,
        setRoleId,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
