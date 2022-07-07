const db = require("../models/index");
const Group = db.group;
const { v4: uuidv4 } = require('uuid');

function initialGroup() {
  Group.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Group({
        name: "OCD",
        uuid: uuidv4(),
        businessUnit: "Orange Cyberdefense",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added OCD to groups collection");
      });
      new Group({
        name: "SMS",
        uuid: uuidv4(),
        businessUnit: "Smart Mobility Services",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added SMS to groups collection");
      });
      new Group({
        name: "OCB",
        uuid: uuidv4(),
        businessUnit: "Orange Cloud for Business",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added OCB to groups collection");
      });
      new Group({
        name: "DD",
        uuid: uuidv4(),
        businessUnit: "Digital and Data",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added DD to groups collection");
      });
      new Group({
        name: "OGSB",
        uuid: uuidv4(),
        businessUnit: "Orange Global Solutions for Business",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added OGSB to groups collection");
      });
      new Group({
        name: "ORA",
        uuid: uuidv4(),
        businessUnit: "Orange",
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added ORA to groups collection");
      });
    }
  });
}

module.exports = { initialGroup };