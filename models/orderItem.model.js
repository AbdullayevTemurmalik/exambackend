module.exports = (sequelize, DataType) => {
  const OrderItem = sequelize.define("OrderItem", {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: "order_id", as: "order", constraints: false });
    OrderItem.belongsTo(models.Product, { foreignKey: "product_id", as: "product", constraints: false });
  };

  return OrderItem;
};
