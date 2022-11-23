require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { errors } = require("celebrate");
const rateLimit = require("express-rate-limit");
const { requestLogger, errorLogger } = require("../middlewares/logger.js");
const errorHandler = require("../middlewares/errorHandler.js");
const auth = require("../middlewares/auth.js");
const articlesRoute = require("../routes/articles.js");
const usersRoute = require("../routes/users.js");
const registerRoute = require("../routes/register.js");
const loginRoute = require("../routes/login.js");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
app.use(cors());
app.options("*", cors());
app.use(limiter);
app.use(express.json());
app.use(requestLogger);

app.use("/signin", loginRoute);
app.use("/signup", registerRoute);
app.use(auth);
app.use("/users", usersRoute);
app.use("/article", articlesRoute);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

module.exports = app;
