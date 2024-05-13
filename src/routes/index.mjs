import { Router } from "express";
import usersRouter from "./users.mjs";
import productsRouter from "./products.mjs";
// import cartsRouter from './carts.mjs'

const router = Router();

router.use(productsRouter);
router.use(usersRouter);
// router.use(cartsRouter);

export default router;
