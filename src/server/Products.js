import axios from "axios";
// import { apiURL } from "../config";

export const getProductsByName = (name) => {
  console.log("llego al api");
  name = name.toString().toLowerCase();

  return axios
    .get(`http://localhost:9087/intecom/products`)
    .then(({ data }) => data)
    .catch((error) => error.message);
  // console.log(data);
};

export const getAllProducts = () => {
  console.log("llego al getAllProducts");
  name = name.toString().toLowerCase();

  return axios
    .get(`http://localhost:9087/intecom/products`)
    .then(({ data }) => data.result)
    .catch((error) => error.message);
  // console.log(data);
};
