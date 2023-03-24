import express from "express";
import healthCheckRoutes from "./routes/health_check";
import { json } from "body-parser";
import accountHoldersRoutes from "./routes/account_holder";
import bankAccountRoutes from "./routes/bank_account";

const app = express();
app.use(json());

app.use("/api/v1/health-check", healthCheckRoutes);
app.use("/api/v1/account_holders", accountHoldersRoutes);
app.use("/api/v1/bank_accounst", bankAccountRoutes);

export default app;
