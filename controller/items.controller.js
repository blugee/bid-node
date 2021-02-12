const sequelize = require("../config/sequelize");
const errors = require('../config/errors');
const logger = require("../helpers/logger").logger;
const error = errors.errors;

module.exports = {

    addItem: async (req, res) => {
        try {
            req.body.user_id = req.userInfo.id

            let item = await sequelize.Items.create(req.body)

            let result = error.ITEM_ADDED_SUCCESSFULLY;
            result.data = item

            logger.info(result);
            return res.status(200).send(result);

        } catch (e) {
            console.log(e);
            return res.status(500).send(error.SERVER_ERROR)
        }
    },

    allItems: async (req, res) => {
        try {
            let item = await sequelize.Items.findAll({
                where: {
                    user_id: req.userInfo.id
                }
            })
            var result = error.OK
            result.data = item

            logger.info(result)
            return res.status(200).send(result)


        } catch (e) {
            console.log(e);
            return res.status(500).send(error.SERVER_ERROR)
        }
    },

    getItem: async (req, res) => {

        if (!req.params.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {

            let item = await sequelize.Items.findOne({ where: { id: req.params.id } })
            if (item) {
                var result = error.OK
                result.data = item

                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.ITEM_NOT_PRESENT;

                logger.info(result);
                return res.status(200).send(result);
            }
        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR)
        }
    },

    deleteItem: async (req, res) => {

        if (!req.body.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            let item = await sequelize.Items.destroy({
                where: { id: req.body.id }
            })

            if (item == 1) {
                var result = error.DELETED_SUCCESSFULLY;

                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.ITEM_NOT_PRESENT;

                logger.info(result);
                return res.status(200).send(result);
            }

        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    updateItem: async (req, res) => {

        if (!req.body.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {

            let item = await sequelize.Items.update(req.body, {
                where: { id: req.body.id }
            })
            if (item == 1) {
                logger.info(error.ITEM_UPDATED_SUCESSFULLY);
                return res.status(200).send(error.ITEM_UPDATED_SUCESSFULLY);
            } else {
                var result = error.ITEM_NOT_PRESENT;

                logger.info(result);
                return res.status(200).send(result);
            }
        } catch (e) {
            console.log(e);
            return res.status(500).send(error.SERVER_ERROR)
        }
    }
}

