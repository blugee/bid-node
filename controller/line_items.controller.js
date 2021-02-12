const sequelize = require("../config/sequelize");
const errors = require('../config/errors');
const logger = require("../helpers/logger").logger;
const error = errors.errors;
const Op = sequelize.Sequelize.Op;

module.exports = {

    addLineItem: async (req, res) => {
        try {
            req.body.user_id = req.userInfo.id
            let feature_body_list = [];
            for (let i = 0; i < req.body.line_item.length; i++) {
                let feature_body = {
                    bid_id: req.body.bid_id,
                    key: req.body.line_item[i].key,
                    item_id: req.body.line_item[i].item_id,
                    line_sqft: req.body.line_item[i].line_sqft,
                    line_thickness: req.body.line_item[i].line_thickness,
                    line_pitch: req.body.line_item[i].line_pitch,
                    calculate_pitch: req.body.line_item[i].calculate_pitch,
                    line_volume: req.body.line_item[i].line_volume,
                    line_sets: req.body.line_item[i].line_sets,
                    line_item_price: req.body.line_item[i].line_item_price,
                    line_material_cost: req.body.line_item[i].line_material_cost,
                    line_labor_cost: req.body.line_item[i].line_labor_cost,
                    user_id: req.userInfo.id
                }
                feature_body_list.push(feature_body);
            }
            let line_item = await sequelize.LineItem.bulkCreate(feature_body_list)

            let result = error.LINE_ITEM_ADDED_SUCCESSFULLY;
            result.data = line_item

            logger.info(result);
            return res.status(200).send(result);

        } catch (e) {
            console.log(e);
            return res.status(500).send(error.SERVER_ERROR)
        }
    },

    allLineItems: async (req, res) => {
        try {
            let line_item = await sequelize.LineItem.findAll({
                where: {
                    user_id: req.userInfo.id
                }
            })
            var result = error.OK
            result.data = line_item

            logger.info(result)
            return res.status(200).send(result)


        } catch (e) {
            console.log(e);
            return res.status(500).send(error.SERVER_ERROR)
        }
    },

    getLineItemsbyItemId: async (req, res) => {

        if (!req.params.item_id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            let line_item = await sequelize.LineItem.findAll({
                where: { item_id: req.params.item_id }
            })
            if (line_item) {
                var result = error.OK
                result.data = line_item

                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.LINE_ITEM_NOT_PRESENT;

                logger.info(result);
                return res.status(200).send(result);
            }

        } catch (e) {
            logger.info(e)
            return res.status(500).send(error.SERVER_ERROR)
        }
    },

    getLineItemsbyBidId: async (req, res) => {

        if (!req.params.bid_id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            let line_item = await sequelize.LineItem.findAll({
                where: { bid_id: req.params.bid_id }
            })
            if (line_item) {
                var result = error.OK
                result.data = line_item

                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.LINE_ITEM_NOT_PRESENT;

                logger.info(result);
                return res.status(200).send(result);
            }

        } catch (e) {
            logger.info(e)
            return res.status(500).send(error.SERVER_ERROR)
        }
    },

    getLineItem: async (req, res) => {

        if (!req.params.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {

            let line_item = await sequelize.LineItem.findOne({ where: { id: req.params.id } })
            if (line_item) {
                var result = error.OK
                result.data = line_item

                logger.info(result);
                return res.status(200).send(result);
            } else {
                var result = error.LINE_ITEM_NOT_PRESENT;

                logger.info(result);
                return res.status(200).send(result);
            }
        } catch (e) {
            logger.info(e);
            return res.status(500).send(error.SERVER_ERROR)
        }
    },

    deleteLineItem: async (req, res) => {

        if (!req.body.id) {
            logger.info(error.MANDATORY_FIELDS);
            return res.status(200).send(error.MANDATORY_FIELDS);
        }
        try {
            let line_item = await sequelize.LineItem.destroy({
                where: { id: req.body.id }
            })

            if (line_item == 1) {
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

    updateLineItem: async (req, res) => {

        try {
            let line_item = await sequelize.LineItem.destroy({
                where: {
                    bid_id: req.body.bid_id
                }
            });

            let feature_body_list = [];

            for (let i = 0; i < req.body.line_item.length; i++) {
                let feature_body = {
                    bid_id: req.body.bid_id,
                    key: req.body.line_item[i].key,
                    item_id: req.body.line_item[i].item_id,
                    line_sqft: req.body.line_item[i].line_sqft,
                    line_thickness: req.body.line_item[i].line_thickness,
                    line_pitch: req.body.line_item[i].line_pitch,
                    calculate_pitch: req.body.line_item[i].calculate_pitch,
                    line_volume: req.body.line_item[i].line_volume,
                    line_sets: req.body.line_item[i].line_sets,
                    line_item_price: req.body.line_item[i].line_item_price,
                    line_material_cost: req.body.line_item[i].line_material_cost,
                    line_labor_cost: req.body.line_item[i].line_labor_cost,
                    user_id: req.userInfo.id
                }
                feature_body_list.push(feature_body);
            }

            line_item = await sequelize.LineItem.bulkCreate(feature_body_list);

            let result = error.UPDATED_SUCESSFULLY
            result.data = line_item

            logger.info(result);
            return res.status(200).send(result);
        } catch (e) {
            console.log(e);
            return res.status(500).send(error.SERVER_ERROR)
        }
    }
}

