const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

//limit repeated requests to public APIs 
const rateLimit = require('express-rate-limit');
const createRateLimit = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 8, // Limit each IP to 8 requests per window
	standardHeaders: true, // Return rate limit info in the RateLimit-* headers
	legacyHeaders: false, // Disable the X-RateLimit-* headers
    message: ({"error":{ "code": "429", "message":"Too many request sended from this IP, please try again after an hour"}})
});

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/common/auth/signup", createRateLimit,
    [
      verifySignUp.checkDuplicateUuidOrEmail,
      verifySignUp.checkRolesExisted,
      verifySignUp.checkGroupsExisted
    ],
    controller.signup
  );
  app.post("/api/common/auth/authorize", createRateLimit, controller.signin);
};