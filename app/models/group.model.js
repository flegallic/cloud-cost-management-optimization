const mongoose = require("mongoose");
const Group = mongoose.model(
  "Group",
  new mongoose.Schema({
    name: String,
    uuid: String,
    businessUnit: String
  })
);
module.exports = Group;