// import { Router } from "express";
// import { mockUsers } from "../constants/mockUsers.mjs";

// const router = Router();

// router.post("/api/auth", (request, response) => {
//   const {
//     body: { username, password },
//   } = request;
//   const findUser = mockUsers.find((user) => user.username === username);
//   if (!findUser || findUser.password !== password) {
//     return response.status(401).send({ msg: "BAD CREDENTIALS" });
//   }

//   request.session.user = findUser;
//   return response.status(200).send(findUser);
// });

// router.get("/api/auth/status", (request, response) => {
//   request.sessionStore.get(request.sessionID, (err, session) => {
//     if (err) {
//       console.log(err);
//       throw err;
//     }
//     console.log(session);
//   });
//   return request.session.user
//     ? response.status(200).send(request.session.user)
//     : response.status(401).send({ msg: "Not Authenticated" });
// });

// router.post("/api/cart", (request, response) => {
//   if (!request.session.user) {
//     return response.sendStatus(401);
//   }

//   const { body: item } = request;
//   const { cart } = request.session;

//   if (cart) {
//     cart.push(item);
//   } else {
//     request.session.cart = [item];
//   }

//   return response.status(201).send(item);
// });

// router.get("/api/cart", (request, response) => {
//   if (!request.session.user) {
//     return response.sendStatus(401);
//   }
//   return response.send(request.session.cart ?? []);
// });

// export default router;
