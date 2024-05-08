import express from "express";
import routes from "./routes/index.mjs";

const app = express();
const PORT = process.env.PORT || 3700;

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

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
