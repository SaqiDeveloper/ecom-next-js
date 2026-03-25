import axios from "axios";

export const api = axios.create({
  baseURL: "https://fake-store-api.mock.beeceptor.com/api",
});