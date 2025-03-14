import axios from "axios";

export const networkClient = axios.create({
  baseURL: process.env.BASE_URL
})