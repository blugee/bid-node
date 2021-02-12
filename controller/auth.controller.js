const sequelize = require("../config/sequelize");
require('dotenv').config();
const errors = require('../config/errors');
const error = errors.errors;
const helper = require('../helpers/validations')
const logger = require('../helpers/logger').logger;

module.exports = {

  signup: async (req, res) => {
    if (!req.body.user_name || !req.body.password || !req.body.email) {
      logger.info(error.MANDATORY_FIELDS);
      return res.status(200).send(error.MANDATORY_FIELDS);
    }
    try {

      req.body.password = helper.hashPassword(req.body.password);
      await sequelize.User.create(req.body)

      let result = {};
      result.data = error.OK

      logger.info(error.OK);
      return res.status(200).send(result);
    } catch (err) {
      console.log(err)
      logger.info(err);
      return res.status(500).send(error.SERVER_ERROR);
    }
  },

  signin: async (req, res) => {
    if (!req.body.user_name || !req.body.password) {
      logger.info(error.MANDATORY_FIELDS);
      return res.status(200).send(error.MANDATORY_FIELDS);
    }
    try {
      let users = await sequelize.User.findOne({
        where: {
          user_name: req.body.user_name
        }
      })
      if (!users) {
        return res.status(402).send(error.USER_NOT_PRESENT);
      }

      const passwordIsValid = helper.comparePassword(req.body.password, users.password);

      if (!passwordIsValid) {
        return res.status(500).send(error.PASSWORD_MISSMATCH);
      }

      const jwtToken = helper.generateUserToken(users.id, users.email);

      let token = jwtToken
      let result = error.OK
      result.accessToken = token

      logger.info(error.OK)
      return res.status(200).send(result);

    }
    catch (err) {
      console.log(err)
      logger.info(err);
      return res.status(500).send(error.SERVER_ERROR);
    };
  }
}