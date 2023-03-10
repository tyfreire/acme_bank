import { Router } from "express";

import { health_check } from "../controllers/health_check";

const router = Router();

router.get("/health-check", health_check);

export default router;
