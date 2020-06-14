const express = require("express");
const session = require("express-session");

const cors = require("cors");
require("dotenv").config(); // to have variables in dotenv file

const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const passport = require("./passport/setup");
const app = express(); // create express server


app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true,
  })
);


const port = process.env.PORT || 5000; // specify the port

app.use(cors()); // app to use cors
// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
//app.use(require('body-parser').urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI; // database uri
mongoose.connect(
  uri, // start conection to db
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
const ProjectsRouter = require("./routes/projects");
const TasksRouter = require("./routes/tasks");
const Auth = require("./routes/auth");

app.use("/projects", ProjectsRouter);
app.use("/tasks", TasksRouter);
app.use("/auth", Auth);

// Express session
app.use(
  session({
    secret: 'secret this',
    resave:false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport middleware
//app.use(passport.initialize());
//app.use(passport.session());


// listen to the server(start server on port)
app.listen(port, () => {
  console.log(`SERVER ON PORT ${port}`);
});
