const db = require("../models/index");
const { v4: uuidv4 } = require('uuid');
const generateApiKey = require('generate-api-key');
const User = db.user;
const Role = db.role;
const Group = db.group;
const Project = db.project;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const apiVersion = process.env.APIVERSION
const apiUrl = process.env.APIURL

exports.signup = (req, res) => {
  const user = new User({
    uuid: uuidv4(),
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    ccmoAccessKeyId: generateApiKey({ length: 26 }),
    ccmoSecretAccessKey: generateApiKey({ method: 'string', length: 42 }),
    secret: generateApiKey({ method: 'string', length: 64 }),
    created: Date.now()
  });

  //return groups of user
  if (!req.body.groups) {
    return res.status(403).send({"status":{"code":"403 - Forbidden","message":"A minimum group is needed to create an account"}});
  }
  Group.find(
    {
      name: { $in: req.body.groups }
    },
    (err, groups) => {
      if (err) {
        return res.status(500).send({"status":{"code":"500 - Internal Server Error", "message":err}});
      }
      user.groups = groups.map(group => group._id);
    }
  )
  
  //return roles of user
  if (!req.body.roles) {
    return res.status(403).send({"status":{"code":"403 - Forbidden","message":"A minimum role is needed to create an account"}});
  }
  Role.find(
    {
      name: { $in: req.body.roles }
    },
    (err, roles) => {
      if (err) {
        return res.status(500).send({"status":{"code":"500 - Internal Server Error", "message":err}});
      }
      user.roles = roles.map(role => role._id);
    }
  )

  //return projects of user
  if (!req.body.projects) {
    return res.status(403).send({"status":{"code":"403 - Forbidden","message":"A minimum project is needed to create an account"}});
  }
  Project.find(
    {
      uuid: { $in: req.body.projects }
    },
    (err, projects) => {
      if (err) {
        return res.status(500).send({"status":{"code":"500 - Internal Server Error", "message":err}});
      }
      const businessUnit = projects.map(project => project.businessUnit)

      if(req.body.groups[0] !== businessUnit[0]){
        return res.status(500).send({"status":{"code":"500 - Internal Server Error", "message":"user not authorised to access on this project"}});
      }
      user.projects = projects.map(project => project._id);
      user.save()
      res.status(200).send({"status":{
        "code":"200",
        "message":"Account has been created with successfully. Keep the personal information safe !",
        "uuid": user.uuid,
        "email": user.email,
        "password":"{{password}}"
      }});     
    }
  )
}

exports.signin = (req, res) => {
  User.findOne({
    uuid: req.body.uuid
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
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({"status":{"code":"401 - Authentication failed","message":"Authentication is required. Invalid credentials."}});
      }
      //get token
      const token = jwt.sign({id:user._id}, user.secret, {
        algorithm: 'HS512',
        expiresIn: '600s'
      });
      //get user roles
      const userRoles = [];
      for (let i = 0; i < user.roles.length; i++) {
        userRoles.push(user.roles[i].name);
      }
      //get user groups
      const userGroups = [];
      for (let i = 0; i < user.groups.length; i++) {
        userGroups.push(user.groups[i].name);
      }
      //get user projects
      const userProjectsName= [];
      for (let i = 0; i < user.projects.length; i++) {
        userProjectsName.push(user.projects[i].name);
      }
      const userProjectsUuid= [];
      for (let i = 0; i < user.projects.length; i++) {
        userProjectsUuid.push(user.projects[i].uuid);
      }

      const user_apiversion = req.query.apiversion;
      if(user_apiversion != apiVersion) {
          return res.status(401).send({"status":{"code":"401 - Authentication failed","message":"HTTP request, maybe missing or invalid HTTP url parameters, or similar.", "url_parameters": apiVersion}});
      }
      res.status(200).send({
        "ccmo_access_key_id": user.ccmoAccessKeyId,
        "ccmo_secret_access_key": user.ccmoSecretAccessKey,
        "groups": userGroups,
        "roles": userRoles,
        "projects": userProjectsName + " - uuid: " + userProjectsUuid,
        "authorization_request_url": apiUrl+"/api/{{business_unit}}/{{project_id}}",
        "token": token,
        "expiresIn": '600s'

      });
    });
};