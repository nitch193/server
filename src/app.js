import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes";
// import bodyParser from "body-parser";
require("dotenv").config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to mongo db database");
  }
);
app.use("/api", routes);

export default app;
