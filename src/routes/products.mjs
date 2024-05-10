import { Router } from "express";

const router = Router();

router.get("/api/products", (request, response) => {
  console.log(111,request.headers.cookie);
  console.log(222,request.cookies);
  console.log(3333,request.signedCookies);
  if (request.signedCookies.hello && request.signedCookies.hello == "world") {
    return response.send([{ id: 123, name: "Chicken Breast", price: 12.99 }]);
  }
  return response
    .status(403)
    .send({ msg: "Sorry. You need the correct cookie" });
});

export default router;
