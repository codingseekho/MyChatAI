require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");
const dns = require("dns");
dns.setServers(["8.8.8.8"]);
const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });