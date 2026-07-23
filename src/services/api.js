import axios from "axios";

const API = axios.create({
  baseURL: "https://mychatai-3.onrender.com/api",
});

export default API;