import { Router } from "express";

import { create, index } from "../controllers/bank_account";

const router = Router();

router.post("/", create);
router.get("/", index);

export default router;
