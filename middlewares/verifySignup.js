const db = require("../config/sequelize");
const ROLES = db.ROLES;
const User = db.User;
const errors = require('../config/errors');
const error = errors.errors;

checkDuplicateNameOrEmail = async (req, res, next) => {
  // Name
  let user = await User.findOne({
    where: {
      user_name: req.body.user_name
    }
  })
  if (user) {
    res.status(402).send(error.NAME_ALREADY_EXITS);
    return;
  }

  // Email
  let email = await User.findOne({
    where: {
      email: req.body.email
    }
  });
  if (email) {
    res.status(402).send(error.EMAIL_ID_ALREADY_EXITS);
    return;
  }

  next();

};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send(error.ROLE_NOT_PRESENT);
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateNameOrEmail: checkDuplicateNameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;