import express from "express";

const app = express();
const PORT = process.env.PORT || 3700;

app.use(express.json());

const loggingMiddleWare = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
};

const resolveIndexByUserID = (request, response, next) => {
  const {
    params: { id },
  } = request;

  const parsedID = +id;
  if (isNaN(parsedID)) {
    return response.sendStatus(400);
  }
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedID);
  if (findUserIndex === -1) {
    return response.sendStatus(404);
  }
  request.findUserIndex = findUserIndex;
  next();
};

const mockUsers = [
  { id: 1, username: "anson", displayname: "Anson" },
  { id: 2, username: "jack", displayname: "Jack" },
  { id: 3, username: "adam", displayname: "Adam" },
  { id: 4, username: "tina", displayname: "Tina" },
  { id: 5, username: "jason", displayname: "Jason" },
  { id: 6, username: "henry", displayname: "Henry" },
  { id: 7, username: "marilyn", displayname: "Marilyn" },
];

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

const FilterUsers = (users, searchString) => {
  const filteredUsers = users.filter((user) => {
    const searchLower =
      typeof searchString === "string"
        ? searchString.toLowerCase()
        : searchString;

    return Object.values(user).some((value) => {
      const strValue = String(value).toLowerCase();
      return strValue.includes(searchLower);
    });
  });

  return filteredUsers;
};

app.get(
  "/",
  (request, response, next) => {
    console.log("Base URL 1");
    next();
  },
  (request, response, next) => {
    console.log("Base URL 2");
    next();
  },
  (request, response, next) => {
    console.log("Base URL 3");
    next();
  },
  (request, response) => {
    response.status(201).send({ msg: "Hello World" });
  }
);

app.get("/api/users", (request, response) => {
  const {
    query: { filter },
  } = request;

  // when filter and value are undefined
  if (!filter) {
    return response.send(mockUsers);
  }

  if (filter) {
    return response.send(FilterUsers(mockUsers, filter));
  }
});

app.post("/api/users", (request, response) => {
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return response.status(201).send(newUser);
});

app.get("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { findUserIndex } = request;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) {
    return response.sendStatus(404);
  }

  return response.send(findUser);
});

app.put("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  return response.sendStatus(200);
});

app.patch("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { body, findUserIndex } = request;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };

  return response.sendStatus(200);
});

app.delete("/api/users/:id", resolveIndexByUserID, (request, response) => {
  const { findUserIndex } = request;

  mockUsers.splice(findUserIndex, 1);
  return response.sendStatus(200);
});
