import express from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3700;

const mockUsers = [
  { id: 1, username: "anson", displayname: "Anson" },
  { id: 2, username: "jack", displayname: "Jack" },
  { id: 3, username: "adam", displayname: "Adam" },
  { id: 4, username: "tina", displayname: "Tina" },
  { id: 5, username: "jason", displayname: "Jason" },
  { id: 6, username: "henry", displayname: "Henry" },
  { id: 7, username: "marilyn", displayname: "Marilyn" },
];

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

app.get("/", (request, response) => {
  response.status(201).send({ msg: "Hello World" });
});

app.get("/api/users", (request, response) => {
  console.log(request.query);
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
  console.log(request.body);
  const { body } = request;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return response.status(201).send(newUser);
});

app.get("/api/users/:id", (request, response) => {
  console.log(request.params);

  const ParsedID = +request.params.id;
  const findUser = mockUsers.find((user) => user.id === ParsedID);

  if (isNaN(ParsedID)) {
    return response.status(400).send({ msg: "Bad Request, Invalid ID" });
  }

  if (!findUser) {
    return response.sendStatus(404);
  }

  return response.send(findUser);
});

app.put("/api/users/:id", (request, response) => {
  const {
    body,
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

  mockUsers[findUserIndex] = { id: parsedID, ...body };
  return response.sendStatus(200);
});

app.get("/api/products", (request, response) => {
  response.send([{ id: 123, name: "chicken breast", price: 12.99 }]);
});

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});
