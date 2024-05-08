import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "Chicken Breast", price: 12.99 }]);
});

export default router;
