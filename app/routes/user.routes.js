const { authJwt } = require("../middlewares");
const apiVersion = process.env.APIVERSION
require('dotenv').config()

//limit repeated requests to public APIs 
const rateLimit = require('express-rate-limit');
const createRateLimit = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 100, // Limit each IP to 100 requests per window
	standardHeaders: true, // Return rate limit info in the RateLimit-* headers
	legacyHeaders: false, // Disable the X-RateLimit-* headers
    message: ({"error":{ "code": "429", "message":"Too many request sended from this IP, please try again after an hour"}})
});

module.exports = function(app) {
  app.use(createRateLimit)
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept",
      "ccmo_access_key_id",
      "ccmo_secret_access_key"
    );
    next();
  });
  app.get("/api", createRateLimit, (req,res) => {
    const user_apiversion = req.query.apiversion;
    if(user_apiversion != apiVersion) {
        return res.status(401).send({"status":{"code":"401 - Authentication failed","message":"HTTP request, maybe missing or invalid HTTP url parameters, or similar.", "url_parameters": apiVersion}});
    }
    res.status(200).send({"status":{ "code": "200", "message": "Welcome to cloud cost management and optimization API"}, "api-version": apiVersion});
  });
  app.get(`/api/:group`, createRateLimit, [authJwt.verifyAuth, authJwt.verifyGroup], (req,res) => {
    const user_apiversion = req.query.apiversion;
    if(user_apiversion != apiVersion) {
        return res.status(401).send({"status":{"code":"401 - Authentication failed","message":"HTTP request, maybe missing or invalid HTTP url parameters, or similar.", "url_parameters": apiVersion}});
    }
    res.send({"status":{
      "code": "200",
      "message": "Group info",
      "group": req.params.group
    },
    "api-version": apiVersion
    });
  });
  app.get(`/api/:group/:project`, createRateLimit, [authJwt.verifyAuth, authJwt.verifyGroup, authJwt.verifyProject], (req,res) => {
    const user_apiversion = req.query.apiversion;
    if(user_apiversion != apiVersion) {
        return res.status(401).send({"status":{"code":"401 - Authentication failed","message":"HTTP request, maybe missing or invalid HTTP url parameters, or similar.", "url_parameters": apiVersion}});
    }
    res.send({"status":{
      "code": "200",
      "message": "Group info",
      "group": req.params.group,
      "project": req.params.project
    },
    "api-version": apiVersion
    });
  });

  
  //default url
  app.get('*', (req,res) => { res.status(404).send({"status":{ "code": "404", "message": "Oops, this page not found !"}}) });
  app.post('*', (req,res) => { res.status(404).send({"status":{ "code": "404", "message": "Oops, this page not found !"}}) });
};