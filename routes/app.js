require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const limiter = require("../middlewares/limiter");
const { requestLogger, errorLogger } = require("../middlewares/logger");
const errorHandler = require("../middlewares/errorHandler");
const auth = require("../middlewares/auth");
const articlesRoute = require("./articles");
const usersRoute = require("./users");
const registerRoute = require("./register");
const loginRoute = require("./login");

const app = express();
app.use(requestLogger);
app.use(cors());
app.options("*", cors());
app.use(limiter);
app.use(express.json());

app.use("/signin", loginRoute);
app.use("/signup", registerRoute);
app.use(auth);
app.use("/users", usersRoute);
app.use("/articles", articlesRoute);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

module.exports = app;
