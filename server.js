const mongoose = require("mongoose");
const app = require("./routes/app");

const { PORT = 3000, DBURL } = process.env;

mongoose.connect(DBURL);

app.listen(PORT);
