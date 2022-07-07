const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./user.model");
db.role = require("./role.model");
db.group = require("./group.model");
db.project = require("./project.model");

//import roles
const role0 = "Guest";
const role1 = "Reporter";
const role2 = "Developer";
const role3 = "Maintainer";
const role4 = "Owner";

//import groups
const group0 = "OCD";
const group1 = "SMS";
const group2 = "OCB";
const group3 = "DD";
const group4 = "OGSB";
const group5 = "ORA";

db.ROLES = [role0,role1,role2,role3,role4];
db.GROUPS = [group0,group1,group2,group3,group4,group5];
module.exports = db;