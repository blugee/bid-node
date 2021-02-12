module.exports = function (sequelize, DataTypes) {
    const Bids = sequelize.define('bids', {
        customer_id: {
            type: DataTypes.INTEGER(),
            notEmpty: true
        },
        bid_date: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        total_labor_cost: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        total_material_cost: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        total_item_price: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        total_sets: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        total_volume: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        total_sqft: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        tax: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        bid_total: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        options_total: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        grand_total: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        notes: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        terms: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        user_id: {
            type: DataTypes.INTEGER(),
            notEmpty: true,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    })
    return Bids
}