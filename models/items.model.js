module.exports = function (sequelize, DataTypes) {
    const Items = sequelize.define('items', {
        name: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        price: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        thickness: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        yield: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        labour: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        total: {
            type: DataTypes.DOUBLE(),
            notEmpty: true
        },
        user_id: {
            type: DataTypes.INTEGER(),
            notEmpty: true
        }
    });
    return Items;
}