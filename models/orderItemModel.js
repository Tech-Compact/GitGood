module.exports = function (sequelize, DataTypes) {

    const OrderItem = sequelize.define("OrderItem", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    });
    OrderItem.associate = (models) => {
        // associations can be defined here
        OrderItem.belongsTo(models.Burrito, {
            allowNull: false
        });
        OrderItem.belongsTo(models.Order, {
            allowNull: false
        });
    };
    return OrderItem;
};