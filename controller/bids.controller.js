const sequelize = require("../config/sequelize");
const errors = require('../config/errors');
const error = errors.errors;
const logger = require('../helpers/logger').logger

module.exports = {

    addBid: async (req, res) => {
        try {

            req.body.user_id = req.userInfo.id
            let Bid = await sequelize.Bid.create(req.body)

            let result = error.BID_ADDED_SUCCESSFULLY
            result.data = Bid

            logger.info(result)
            return res.status(200).send(result)
        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    allBids: async (req, res) => {
        try {
            let Bid = await sequelize.Bid.findAll({
                where: {
                    user_id: req.userInfo.id
                }
            })

            var result = error.OK
            result.data = Bid

            logger.info(error.OK)
            return res.status(200).send(result)
        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    getBid: async (req, res) => {
        if (!req.params.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            const id = req.params.id;
            const Bid = await sequelize.Bid.findOne({
                where: {
                    id: id,
                }
            })
            if (Bid) {
                var result = error.OK
                result.data = Bid

                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.BID_NOT_PRESENT;

                logger.info(result);
                return res.status(200).send(result);
            }

        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    getBidByCustomerId: async (req, res) => {
        if (!req.params.customer_id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            const id = req.params.customer_id;
            const Bid = await sequelize.Bid.findAll({
                where: {
                    customer_id: id
                }
            })
            if (Bid) {
                var result = error.OK
                result.data = Bid

                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.BID_NOT_PRESENT;

                logger.info(result);
                return res.status(200).send(result);
            }

        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    getBidByDate: async (req, res) => {
        if (!req.params.date) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            const date = req.params.date;
            const Bid = await sequelize.Bid.findAll({
                where: {
                    bid_date: date
                }
            })
            if (Bid) {
                var result = error.OK
                result.data = Bid

                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.BID_NOT_PRESENT;

                logger.info(result);
                return res.status(200).send(result);
            }

        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    deletebid: async (req, res) => {
        if (!req.body.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {

            const Bid = await sequelize.Bid.destroy({
                where: { id: req.body.id }
            })
            if (Bid == 1) {
                var result = error.DELETED_SUCCESSFULLY;
                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.ENTITY_NOT_PRESENT;
                logger.info(result);
                return res.status(200).send(result);
            }

        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR);
        }
    },

    updatebid: async (req, res) => {
        if (!req.body.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            const Bid = await sequelize.Bid.update(req.body, {
                where: { id: req.body.id }
            })
            if (Bid == 1) {
                let result = error.BID_UPDATED_SUCESSFULLY
                result.data = { id: req.body.id }
                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.BID_NOT_PRESENT;

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