import { Router } from "express";

import { create, index, show, destroy } from "../controllers/bank_account";

const router = Router();

router.post("/", create);
router.get("/", index);
router.get("/:id", show);
router.delete("/:id", destroy);

export default router;
