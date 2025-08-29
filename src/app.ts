import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import currencyRoutes from "./routes/currencyRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/currency", currencyRoutes);

export default app;
