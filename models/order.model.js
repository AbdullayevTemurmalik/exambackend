module.exports = (sequelize, DataType) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataType.STRING,
      defaultValue: "pending",
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "user_id", as: "user", constraints: false });
    Order.hasMany(models.OrderItem, { foreignKey: "order_id", as: "orderItems", constraints: false });
  };

  return Order;
};
