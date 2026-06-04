module.exports = (sequelize, DataType) => {
  const Cart = sequelize.define("Cart", {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataType.INTEGER,
      defaultValue: 1,
    },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "user_id", as: "user", constraints: false });
    Cart.belongsTo(models.Product, { foreignKey: "product_id", as: "product", constraints: false });
  };

  return Cart;
};
