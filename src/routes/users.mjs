import { Router } from "express";
import {
  checkSchema,
  matchedData,
  query,
  validationResult,
} from "express-validator";
import { FilterUsers } from "../utils/FilterUsers.mjs";
import { mockUsers } from "../constants/mockUsers.mjs";
import { createUserValidationSchema } from "../utils/validationSchemas.mjs";
import { resolveIndexByUserID } from "../middlewares/usersMiddlewares.mjs";
import { User } from "../mongoose/schemas/user.mjs";

const router = Router();

router.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 3, max: 10 })
    .withMessage("Must be at least 3-10 characters"),
  (request, response) => {
    const {
      query: { filter },
    } = request;
    console.log(request.session.id);
    request.sessionStore.get(request.session.id, (err, sessionData) => {
      if (err) {
        console.log(err);
        throw err;
      }
      console.log(sessionData);
    });
    const result = validationResult(request);
    // console.log(result);

    // when filter and value are undefined
    if (!filter) {
      return response.send(mockUsers);
    }

    if (filter) {
      return response.send(FilterUsers(mockUsers, filter));
    }
  }
);

router.get("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) {
    return response.sendStatus(404);
  }

  return response.send(findUser);
});

router.post(
  "/api/users",
  checkSchema(createUserValidationSchema),
  async (request, response) => {
    const { body } = request;

    const result = validationResult(request);

    if (!result.isEmpty()) return response.status(400).send(result.array());

    const data = matchedData(request);

    console.log(data);

    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      return response.status(201).send(savedUser);
    } catch (error) {
      console.log(error);
      return response.sendStatus(400);
    }
  }
);
router.get("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) {
    return response.sendStatus(404);
  }

  return response.send(findUser);
});

router.put("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

router.patch("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return response.sendStatus(200);
});

router.delete("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { findUserIndex } = request;

  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});

export default router;
