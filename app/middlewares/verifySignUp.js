const db = require("../models/index");
const User = db.user;
const Role = db.role;
const Group = db.group;
const Project = db.project;

// find document in the groups,roles,projects collection
async function getCollections(collection) {
    return await collection.find()
}
// get role name and add to an array
const getRolesByName = async () => {
  const posts = await getCollections(Role);
  let rolesArray = [];
  for(var i=0; i<posts.length; i++) {
    //add in array
    rolesArray.push(posts[i].name)
  }
  return rolesArray;
}
// get group name and add to an array
const getGroupsByName = async () => {
    const posts = await getCollections(Group);
    let groupsArray = [];
    for(var i=0; i<posts.length; i++) {
      //add in array
      groupsArray.push(posts[i].name)
    }
    return groupsArray;
}
// get project name and add to an array
const getProjectsByUuid = async () => {
  const posts = await getCollections(Project);
  let projectsArray = [];
  for(var i=0; i<posts.length; i++) {
    //add in array
    projectsArray.push(posts[i].uuid)
  }
  return projectsArray;
}

// check if uuid or email exists
checkDuplicateUuidOrEmail = (req, res, next) => {
  // uuid
  User.findOne({
    uuid: req.body.uuid
  }).exec((err, user) => {
    if (err) {
      return res.status(500).send({"status":{"code":"500 - Internal Server Error", "message":err}});
    }
    if (user) {
      return res.status(400).send({"status":{"code":"400 - Bad request","message":"Failed! uuid is already in use!"}});
    }
    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        return res.status(500).send({"status":{"code":"500 - Internal Server Error", "message":err}});
      }
      if (user) {
        return res.status(400).send({"status":{"code":"400 - Bad request","message":"Failed! Email is already in use!"}});
      }
      next();
    });
  });
};

// check if Roles exists
checkRolesExisted = (req, res, next) => {
  // get list of roles in array
  getRolesByName().then(data => {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        //check if roles exists
        if (!data.includes(req.body.roles[i])) {
          return res.status(400).send({"status":{"code":"400 - Bad request","message":`Failed! Role ${req.body.roles[i]} does not exist!`}});
        }
      }
    }
    next();
  });
};

// check if Groups exists
checkGroupsExisted = (req, res, next) => {
  //get list of groups in array
  getGroupsByName().then(data => {
    if (req.body.groups) {
      for (let i = 0; i < req.body.groups.length; i++) {
        //check if groups exists
        if (!data.includes(req.body.groups[i])) {
          return res.status(400).send({"status":{"code":"400 - Bad request","message":`Failed! Group ${req.body.groups[i]} does not exist!`}});
        }
      }
    }
    next();
  }); 
};

// check if Projects exists
checkProjectsExisted = (req, res, next) => {
  //get list of projects in array
  getProjectsByUuid().then(data => {
    if (req.body.projects) {
      for (let i = 0; i < req.body.projects.length; i++) {
        //check if projects exists
        if (!data.includes(req.body.projects[i])) {
          return res.status(400).send({"status":{"code":"400 - Bad request","message":`Failed! Project ${req.body.projects[i]} does not exist!`}});
        }
      }
    }
    next();
  }); 
};

//export function checkDuplicateUuidOrEmail, checkRolesExisted, checkGroupsExisted and checkProjectsExisted
const verifySignUp = {
  checkDuplicateUuidOrEmail,
  checkRolesExisted,
  checkGroupsExisted,
  checkProjectsExisted
};
module.exports = verifySignUp;