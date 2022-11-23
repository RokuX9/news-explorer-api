const app = require("./routes/app.js");
const mongoose = require("mongoose");

const { PORT = 3000 } = process.env;

mongoose.connect("mongodb://localhost:27017/news-explorer");

app.listen(PORT);
