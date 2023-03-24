import { Router } from "express";

import { create } from "../controllers/bank_account";

const router = Router();

router.post("/", create);

export default router;
