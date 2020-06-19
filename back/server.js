const express = require("express");
const session = require("express-session");
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config(); // to have variables in dotenv file
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const passport = require("./passport/setup");
const app = express(); // create express server
app.use(cors()); // app to use cors
app.use(session({ secret: "cats" }));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
/* app.use(bodyParser.urlencoded({ extended: false }));
 *//* app.use(passport.initialize());
app.use(passport.session());
 */
// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
/* app.use(bodyParser.urlencoded({ extended: true }))
 */
const port = process.env.PORT || 5000; // specify the port

mongoose.connect(
  process.env.ATLAS_URI, // start conection to db
  {
    useNewUrlParser: true, // check
    useCreateIndex: true, // check
    useUnifiedTopology: true,
    useFindAndModify: false,
  }, (err, db) => database = db
);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MONGODB database connection established");
});

// require routes
app.use("/projects", require("./routes/projects"));
app.use("/tasks", require("./routes/tasks"));
app.use("/auth", require("./routes/auth"));


// listen to the server(start server on port)
app.listen(port, () => {
  console.log(`SERVER ON PORT ${port}`);
});
