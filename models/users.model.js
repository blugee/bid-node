module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('users', {
        user_name: {
            type: DataTypes.STRING,
            notEmpty: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        }
    });

    return User;
}