const sequelize = require("../config/sequelize");
const errors = require('../config/errors');
const error = errors.errors;
const logger = require('../helpers/logger').logger;
const helpers = require('../helpers/validations');

module.exports = {

    addUser: async (req, res) => {
        if (!req.body.user_name || !req.body.password || !req.body.email) {
            logger.info(error.MANDATORY_FIELDS)
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            req.body.password = helpers.hashPassword(req.body.password);
            let user = await sequelize.User.create(req.body)

            let result = error.OK;
            result.data = user;

            logger.info(error.OK);
            return res.status(200).send(error.OK)

        } catch (e) {
            logger.info(e)
            return res.status(500).send(error.SERVER_ERROR)
        }
    },

    allUsers: async (req, res) => {
        try {
            let users = await sequelize.User.findAll({ attributes: { exclude: ['password'] } })

            var result = error.OK
            result.data = users

            logger.info(result);
            return res.status(200).send(result)
        } catch (e) {
            logger.info(e)
            return res.status(500).send(error.SERVER_ERROR)
        }
    },

    getUser: async (req, res) => {
        try {
            let users = await sequelize.User.findOne({
                where: {
                    id: req.params.id
                },
                attributes: {
                    exclude: ['password']
                }
            })
            if (users) {
                var result = error.OK;
                result.data = users;

                logger.info(error.OK);
                return res.status(200).send(result);
            } else {
                var result = error.USER_NOT_PRESENT

                logger.info(result);
                return res.status(200).send(result);
            }
        } catch (e) {
            logger.info(e)
            return res.status(500).send(error.SERVER_ERROR)
        }
    },

    deleteUser: async (req, res) => {
        try {
            let user = await sequelize.User.destroy({
                where: {
                    id: req.body.id
                }
            })
            if (user == 1) {
                var result = error.DELETED_SUCCESSFULLY
                logger.info(result);
                return res.status(200).send(result)
            } else {
                var result = error.USER_NOT_PRESENT;
                logger.info(result);
                return res.status(200).send(result);
            }

        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    updateUser: async (req, res) => {
        if (!req.body.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            let user = await sequelize.User.update(req.body, {
                where: {
                    id: req.body.id
                }
            })
            if (user == 1) {
                logger.info(error.UPDATED_SUCESSFULLY);
                return res.status(200).send(error.UPDATED_SUCESSFULLY);

            } else {
                var result = error.USER_NOT_PRESENT;
                logger.info(result);
                return res.status(200).send(result);
            }
        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    }
};