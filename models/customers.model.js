module.exports = function (sequelize, DataTypes) {
    const Customers = sequelize.define("customers", {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        company_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER(),
            allowNull: true
        }
    })
    return Customers
}