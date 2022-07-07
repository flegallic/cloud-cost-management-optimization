const db = require("../models/index");
const Role = db.role;
const { v4: uuidv4 } = require('uuid');

function initialRole() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "Guest",
        uuid: uuidv4(),
        permissions: "read",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Guest to roles collection");
      });
      new Role({
        name: "Reporter",
        uuid: uuidv4(),
        permissions: "read,update",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Reporter to roles collection");
      });
      new Role({
        name: "Developer",
        uuid: uuidv4(),
        permissions: "read,update,edit",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Developer to roles collection");
      });
      new Role({
        name: "Maintainer",
        uuid: uuidv4(),
        permissions: "read,update,edit,manage",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Maintainer to roles collection");
      });
      new Role({
        name: "Owner",
        uuid: uuidv4(),
        permissions: "read,update,edit,manage,delete",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Owner to roles collection");
      });
    }
  });
}

module.exports = { initialRole };