import { Router } from "express";

import { create } from "../controllers/account_holder";

const router = Router();

router.post("/", create);

export default router;
