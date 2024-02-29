import axios from "axios";
import Categoria from "../model/Categoria";

axios.defaults.baseURL = "http://localhost:8080";

export async function create(url: string, data: Categoria) {
  const response = await axios.post(url, data);
  return response;
}

export async function findAll(url: string) {
  const response = await axios.get(url);
  return response.data;
}

export async function destroy(url: string) {
  axios.delete(url);
}
