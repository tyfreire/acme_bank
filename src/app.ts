import express from "express";
import healthCheckRoutes from "./routes/health_check";
import { json } from "body-parser";

const app = express();
app.use(json());

app.use("/api/v1", healthCheckRoutes);

export default app;
