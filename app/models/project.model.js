const mongoose = require("mongoose");
const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    name: String,
    uuid: String,
    reference: String,
    tag: String,
    businessUnit: String,
    projectCode: String,
    projectNumber: String,
    created: Date
  })
);
module.exports = Project;