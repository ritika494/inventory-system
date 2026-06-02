import axios from "axios";

const api = axios.create({
  baseURL: "https://inventory-system-07pk.onrender.com"
});

export default api;
