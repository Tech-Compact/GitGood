module.exports = function (sequelize, DataTypes) {
  const Burrito = sequelize.define("Burrito", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
  Burrito.associate = (models) => {
    // associations can be defined here
    Burrito.hasMany(models.OrderItem);
  };
  return Burrito;
};