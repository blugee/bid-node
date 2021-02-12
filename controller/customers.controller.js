const sequelize = require("../config/sequelize");
const errors = require('../config/errors');
const error = errors.errors;
const logger = require('../helpers/logger').logger;

module.exports = {

    addCustomer: async (req, res) => {
        if (!req.body.name || !req.body.company_name || !req.body.phone_number || !req.body.email || !req.body.address) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {

            req.body.user_id = req.userInfo.id
            let Customer = await sequelize.Customers.findOne({
                where: {
                    name: req.body.name,
                    phone_number: req.body.phone_number
                }
            })
            if (!Customer) {
                Customer = await sequelize.Customers.create(req.body)

                let result = error.CUSTOMER_ADDED_SUCCESSFULLY
                result.data = Customer

                logger.info(result)
                return res.status(200).send(result)
            } else {
                let result = error.NAME_ALREADY_EXITS

                logger.info(result);
                return res.status(200).send(result);
            }
        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    allCustomers: async (req, res) => {
        try {
            let Customer = await sequelize.Customers.findAll({
                where: {
                    user_id: req.userInfo.id
                }
            })

            var result = error.OK
            result.data = Customer

            logger.info(error.OK)
            return res.status(200).send(result)
        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    getCustomer: async (req, res) => {
        if (!req.params.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            const id = req.params.id;
            let Customer = await sequelize.Customers.findOne({
                where: {
                    id: id
                }
            })
            if (Customer) {
                var result = error.OK
                result.data = Customer

                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.CUSTOMER_NOT_PRESENT;

                logger.info(result);
                return res.status(200).send(result);
            }

        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    deleteCustomer: async (req, res) => {
        if (!req.body.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {

            let Customer = await sequelize.Customers.destroy({
                where: { id: req.body.id }
            })
            if (Customer == 1) {
                var result = error.DELETED_SUCCESSFULLY;
                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.CUSTOMER_NOT_PRESENT;
                logger.info(result);
                return res.status(200).send(result);
            }

        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    updateCustomer: async (req, res) => {
        if (!req.body.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            const Customer = await sequelize.Customers.update(req.body, {
                where: { id: req.body.id }
            })
            if (Customer == 1) {

                logger.info(result);
                return res.status(200).send(error.CUSTOMER_UPDATED_SUCESSFULLY);
            } else {
                var result = error.ENTITY_NOT_PRESENT;

                logger.info(result);
                return res.status(200).send(result);
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    }
};