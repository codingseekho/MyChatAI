import axios from "axios";

const API = axios.create({
  baseURL: "https://mychatai-3.onrender.com",
  timeout: 60000
});

export const wakeServer = async () => {
  try {
    await fetch("https://mychatai-3.onrender.com/");
  } catch (e) {
    console.log("Waking Render server...");
  }
};

export default API;