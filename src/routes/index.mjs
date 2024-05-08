import { Router } from "express";
import usersRouter from "./users.mjs";
import productsRouter from "./products.mjs";

const router = Router();

router.use(productsRouter);
router.use(usersRouter);

export default router;
