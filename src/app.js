import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

// Apply middlware for CORS and JSON endpoing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
