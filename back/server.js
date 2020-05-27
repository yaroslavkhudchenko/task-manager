const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config(); // to have variables in dotenv file

const app = express(); // create express server
const port = process.env.PORT || 5000; // specify the port

app.use(cors()); // app to use cors
app.use(express.json()); // allow to parse json

const uri = process.env.ATLAS_URI; // database uri
mongoose.connect(
  uri, // start conection to db
  {
    useNewUrlParser: true, // check
    useCreateIndex: true, // check
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MONGODB database connection established");
});

// require routes
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

// app to use routes
app.use("/exercises", exercisesRouter); // when user go to app / exerices load exercisesRouter
app.use("/users", usersRouter); // when user go to app / users load usersRouter

// listen to the server(start server on port)
app.listen(port, () => {
  console.log(`SERVER ON PORT ${port}`);
});
