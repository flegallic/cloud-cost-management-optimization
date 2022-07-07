const mongoose = require("mongoose");
const Role = mongoose.model(
  "Role",
  new mongoose.Schema({
    name: String,
    uuid: String,
    permissions: String
  })
);
module.exports = Role;