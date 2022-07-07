const db = require("../models/index");
const ROLES = db.ROLES;
const GROUPS = db.GROUPS;
const User = db.user;

checkDuplicateUuidOrEmail = (req, res, next) => {
  // uuid
  User.findOne({
    uuid: req.body.uuid
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user) {
      res.status(400).send({ message: "Failed! uuid is already in use!" });
      return;
    }
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        return res.status(400).send({"status":{"code":"400 - Bad request","message":"Failed! Email is already in use!"}});
      }
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).send({"status":{"code":"400 - Bad request","message":`Failed! Role ${req.body.roles[i]} does not exist!`}});
      }
    }
  }
  next();
};
checkGroupsExisted = (req, res, next) => {
  if (req.body.groups) {
    for (let i = 0; i < req.body.groups.length; i++) {
      if (!GROUPS.includes(req.body.groups[i])) {
        return res.status(400).send({"status":{"code":"400 - Bad request","message":`Failed! Role ${req.body.groups[i]} does not exist!`}});
      }
    }
  }
  next();
};
const verifySignUp = {
  checkDuplicateUuidOrEmail,
  checkRolesExisted,
  checkGroupsExisted
};
module.exports = verifySignUp;