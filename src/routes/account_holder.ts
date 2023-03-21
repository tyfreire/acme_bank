import { Router } from "express";

import { create, index, show } from "../controllers/account_holder";

const router = Router();

router.post("/", create);
router.get("/", index);
router.get("/:id", show);

export default router;
