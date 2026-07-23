import axios from "axios";

const API = axios.create({
  baseURL: "https://mychatai-3.onrender.com",
});

export const wakeServer = async () => {
  try {
    await API.get("/");
  } catch (e) {
    console.log("Render server waking...");
  }
};

export default API;