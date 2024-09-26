const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/studentmanagement")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

app.use("/api", require("./routes"));
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
