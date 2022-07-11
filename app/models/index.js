const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.group = require("./group.model");
db.project = require("./project.model");

module.exports = db;