module.exports = function (sequelize, DataTypes) {

  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    totalCost: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  });
  Order.associate = (models) => {
    // associations can be defined here
    Order.hasMany(models.OrderItem);
  };
  return Order;
};