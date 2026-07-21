import axios from "axios";

const API = axios.create({
  baseURL: "https://mychatai-qwgv.onrender.com"
});

export default API;