import axiosLib from "axios";

export const axios = axiosLib.create({
  baseURL: "http://localhost:3333/api", // Base da API
  headers: { "Content-Type": "application/json" },
});
