import CryptoJS from "crypto-js";
import { secretKey } from "@/constants/secret-key";

export const dataEncrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};
