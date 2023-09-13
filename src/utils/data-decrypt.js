import CryptoJS from "crypto-js";
import { secretKey } from "@/constants/secret-key";

export const dataDecrypt = (data) => {
  // console.log("********* dataDecrypt **********");
  // console.log(data);
  // console.log(secretKey);
  if (!data) {
    return null;
  }
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  const txt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  // console.log("texto desencriptado: " + txt);
  return txt;
};
