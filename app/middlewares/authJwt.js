const jwt = require("jsonwebtoken");
const db = require("../models/index");
require('dotenv').config()
const User = db.user;
//const Role = db.role;
const Group = db.group;
const Project = db.project;
const apiVersion = process.env.APIVERSION

//check Authentification
verifyAuth = (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  let token = authHeaders && authHeaders.split(' ')[1];
  let ccmo_access_key_id = req.headers["ccmo_access_key_id"];
  let ccmo_secret_access_key = req.headers["ccmo_secret_access_key"];

  if (!token || !ccmo_access_key_id || !ccmo_secret_access_key) {
    return res.status(403).send({"status":{"code":"403 - Forbidden","message":"The API credentials you provided are not valid or token has been expired."}});
  }
  const user_apiversion = req.query.apiversion;
  if(user_apiversion != apiVersion) {
    return res.status(401).send({"status":{"code":"401 - Authentication failed","message":"HTTP request, maybe missing or invalid HTTP url parameters, or similar.", "url_parameters": apiVersion}});
  }

  User.findOne({
    ccmoAccessKeyId: req.headers.ccmo_access_key_id,
    ccmoSecretAccessKey: req.headers.ccmo_secret_access_key
  })
    .populate("roles", "-__v")
    .populate("groups", "-__v")
    .populate("projects", "-__v")
    .exec((err, user) => {
      if (err) {
        return res.status(500).send({"status":{"code":"500 - Internal Server Error", "message":err}});
      }
      if (!user) {
        return res.status(401).send({"status":{"code":"401 - Authentication failed","message":"Authentication is required. Invalid credentials."}});
      }
      jwt.verify(token, user.secret, (err, decoded) => {
        if (err) {
          return res.status(403).send({"status":{"code":"403 - Forbidden","message":"The API credentials you provided are not valid or token has been expired."}});
        }
        req.decoded = decoded.id;
        next();
      });
    });
};

verifyGroup = (req, res, next) => {
  User.findById(req.decoded).exec((err, user) => {
    if (err) {
      return res.status(500).send({"status":{"code":"500 - Internal Server Error", "message":err}});
    }
    Group.find(
      {
        _id: { $in: user.groups }
      },
      (err, groups) => {
        if (err) {
          return res.status(500).send({"status":{"code":"500 - Internal Server Error", "message":err}});
        }
        for (let i = 0; i < groups.length; i++) {
          if (groups[i].name === (req.params.group).toUpperCase() ){
            next();
            return;
          }
        }
        return res.status(403).send({"status":{"code":"403 - Forbidden","message":"You don't have sufficient privileges to access this business unit"}});
      }
    );
  });
};

verifyProject = (req, res, next) => {
  User.findById(req.decoded).exec((err, user) => {
    if (err) {
      return res.status(500).send({"status":{"code":"500 - Internal Server Error", "message":err}});
    }
    Project.find(
      {
        _id: { $in: user.projects }
      },
      (err, projects) => {
        if (err) {
          return res.status(500).send({"status":{"code":"500 - Internal Server Error", "message":err}});
        }
        for (let i = 0; i < projects.length; i++) {
          if (projects[i].uuid === req.params.project && projects[i].businessUnit === (req.params.group).toUpperCase()) {
            next();
            return;
          }
        }
        return res.status(403).send({"status":{"code":"403 - Forbidden","message":"You don't have sufficient privileges to access this project"}});
      }
    );
  });
};

//export function Authentification, Roles and Groups
const authJwt = {
  verifyAuth,
  //verifyRole,
  verifyGroup,
  verifyProject
};
module.exports = authJwt;