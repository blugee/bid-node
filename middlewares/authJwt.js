const jwt = require("jsonwebtoken");
// const config = require("../config/db.config.js");
const db = require("../config/sequelize");
const User = db.User;
const errors = require('../config/errors');
const error = errors.errors;

require('dotenv').config();
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send(error.TOKEN_NOT_PROVIDED);
  }


  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send(error.UNAUTHORIZED);
    }
    req.userInfo = decoded;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(users => {
    users.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send(error.FORBIDDEN);
      return;
    });
  });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId).then(users => {
    users.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "users") {
          next();
          return;
        }
      }

      res.status(403).send(error.FORBIDDEN);
      return;
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = authJwt;