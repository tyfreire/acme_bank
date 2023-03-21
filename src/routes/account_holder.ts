import { Router } from "express";

import { create, index } from "../controllers/account_holder";

const router = Router();

router.post("/", create);
router.get("/", index);

export default router;
