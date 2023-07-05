import { useRouter } from "next/router";
import React, { useState } from "react";
// import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = (e) => {
    e.preventDefault();
    if (
      (username === "admin" && password === "admin") ||
      (username === "jbarron" && password === "jbarronAd")
    ) {
      console.log("login");
      let pageUrl = "/addOrder";
      router.push(pageUrl);
    } else {
      // Swal.fire({
      //   icon: "error",
      //   title: "Error en al iniciar sesión",
      //   text: "Error en al iniciar sesión, verifique sus credenciales",
      // });
    }
  };

  return (
    <div class="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100  ">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Usuario
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Usuario"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Contraseña
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={(e) => login(e)}
          >
            Iniciar sesión
          </button>
        </div>
      </form>
      <p class="text-center text-gray-500 text-xs">
        &copy;{new Date().getFullYear} DEVAS. derechos reservados.
      </p>
    </div>
  );
};

export default Login;
