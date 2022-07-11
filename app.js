var createError = require('http-errors');
require("dotenv").config();
const express = require('express');
var path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//secure apps by setting various HTTP headers
const helmet = require("helmet");
app.use(helmet());

//api access controls
var cors = require('cors');
const PORT = 3000;
const HOST = '0.0.0.0';
var corsOptions = { origin: `http://${HOST}:${PORT}`};
app.use(cors(corsOptions));
var cookieParser = require('cookie-parser');

//event logging
const morgan = require("morgan");
app.use(morgan('combined'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect to mongodb
const db = require("./app/models/index");
db.mongoose.connect("mongodb://"+process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb", {
   auth: {
     username: process.env.COSMOSDB_USER,
     password: process.env.COSMOSDB_PASSWORD
   },
 useNewUrlParser: true,
 useUnifiedTopology: true,
 retryWrites: false
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
  //// only to create groups, projects and roles
  // const createGroups = require("./app/config/create.groups")
  // const createProjects  = require("./app/config/create.projects")
  // const createRoles  = require("./app/config/create.roles")
  // createGroups.initialGroup();
  // createProjects.initialProject();
  // createRoles.initialRole();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

//import routes file
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) { next(createError(404)); });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
