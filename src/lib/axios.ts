import axios from "axios";

export const networkClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL
})