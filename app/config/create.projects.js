const db = require("../models/index");
const Project = db.project;
const { v4: uuidv4 } = require('uuid');

function initialProject() {
  Project.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Project({
        name: "Project1",
        uuid: uuidv4(),      
        reference: "10000002101",
        tag: "azure",
        businessUnit: "OCB",
        projectCode: "OCBPRJ01",
        projectNumber: "OCB10000002101",
        created: new Date()
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Project1 to collection");
      });
      new Project({
        name: "Project2",
        uuid: uuidv4(),      
        reference: "10000002102",
        tag: "aws",
        businessUnit: "OCB",
        projectCode: "OCBPRJ02",
        projectNumber: "OCB10000002102",
        created: new Date()
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Project2 to collection");
      });
      new Project({
        name: "Project3",
        uuid: uuidv4(),      
        reference: "10000002103",
        tag: "fe",
        businessUnit: "OCB",
        projectCode: "OCBPRJ03",
        projectNumber: "OCB10000002103",
        created: new Date()
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Project3 to collection");
      });


      new Project({
        name: "Project1",
        uuid: uuidv4(),      
        reference: "10000002101",
        tag: "azure",
        businessUnit: "DD",
        projectCode: "DDPRJ01",
        projectNumber: "DD10000002101",
        created: new Date()
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Project1 to collection");
      });
      new Project({
        name: "Project2",
        uuid: uuidv4(),      
        reference: "10000002102",
        tag: "aws",
        businessUnit: "DD",
        projectCode: "DDPRJ02",
        projectNumber: "DD10000002102",
        created: new Date()
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Project2 to collection");
      });
      new Project({
        name: "Project3",
        uuid: uuidv4(),      
        reference: "10000002103",
        tag: "fe",
        businessUnit: "DD",
        projectCode: "DDPRJ03",
        projectNumber: "DD10000002103",
        created: new Date()
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Project3 to collection");
      });

    }
  });
}

module.exports = { initialProject };