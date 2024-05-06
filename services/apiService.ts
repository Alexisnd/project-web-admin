import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_NODE_PROD
  ? process.env.NEXT_PUBLIC_APIURL_PROD
  : process.env.NEXT_PUBLIC_APIURL_DEV;

const validateToken = () => {
  const token = localStorage.getItem("token"); // Obtenga el token del almacenamiento local
  if (token) {
    return { headers: { Authorization: `Bearer ${token}` } };
  } else {
    return {}; // Devuelva un objeto vacío si no hay token
  }
};

export const get = async (url: string) => {
  const { data } = await axios.get(baseURL + url, validateToken());
  return data;
};

export const post = async (url: string, data: any) => {
  const response = await axios.post(baseURL + url, data, validateToken());
  return response.data;
};

export const put = async (url: string, data: any) => {
  const response = await axios.put(baseURL + url, data, validateToken());
  return response.data;
};

export const deleteFn = async (url: string) => {
  const response = await axios.delete(baseURL + url, validateToken());
  return response.data;
};
