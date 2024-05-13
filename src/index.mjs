import express, { response } from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUsers } from "./constants/mockUsers.mjs";
import passport from "passport";
import "./strategies/local-strategy.mjs";

const app = express();

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "anson the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const PORT = process.env.PORT || 3700;

app.listen(PORT, () => {
  console.log(`Running on Port ${PORT}`);
});

app.post("/api/auth", passport.authenticate("local"), (request, response) => {
  response.sendStatus(200);
});

app.get("/api/auth/status", (request, response) => {
  console.log("Inside /auth/status endpoint");
  console.log(request.user);
  console.log(request.session);
  return request.user ? response.send(request.user) : response.sendStatus(401);
});
app.post("/api/auth/logout", (request, response) => {
  if (!request.user) {
    return response.sendStatus(401);
  }
  request.logOut((err) => {
    if (err) {
      return response.sendStatus(400);
    }
    response.send(200);
  });
});

// app.get("/", (request, response) => {
//   console.log(request.session);
//   console.log(request.session.id);
//   request.session.visited = true;
//   response.cookie("hello", "world", { maxAge: 30000, signed: true });
//   response.status(201).send({ msg: "Hello World" });
// });
