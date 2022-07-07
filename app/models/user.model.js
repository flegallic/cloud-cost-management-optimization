const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    uuid: String,
    email: String,
    password: String,
    ccmoAccessKeyId: String,
    ccmoSecretAccessKey: String,
    secret: String,
    created: Date,
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
      }
    ],
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }
    ],
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);
module.exports = User;