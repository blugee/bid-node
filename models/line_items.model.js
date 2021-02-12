module.exports = function (sequelize, DataTypes) {
    const LineItem = sequelize.define('line_items', {
        key: {
            type: DataTypes.INTEGER(),
            notEmpty: true
        },
        bid_id: {
            type: DataTypes.INTEGER(),
            notEmpty: true
        },
        item_id: {
            type: DataTypes.INTEGER(),
            notEmpty: true
        },
        line_sqft: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        line_thickness: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        line_pitch: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        calculate_pitch: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        line_volume: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        line_sets: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        line_item_price: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        line_material_cost: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        line_labor_cost: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        user_id: {
            type: DataTypes.INTEGER(),
            notEmpty: true
        }
    });
    return LineItem;
}