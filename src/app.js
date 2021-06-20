import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes";
import Logger from "morgan";
require("dotenv").config();
const app = express();

app.use(cors());
app.use(Logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  () => {
    console.log("Connected to mongo db database");
  }
);
app.use("/api", routes);

export default app;
