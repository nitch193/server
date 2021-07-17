import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./routes";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
app.use(helmet());
require("dotenv").config();
app.set("trust proxy", 1);
app.use(morgan("tiny"));
app.use(cors());
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
