module.exports = (sequelize, DataType) => {
  const Cart = sequelize.define("Cart", {
    id: { type: DataType.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataType.INTEGER, allowNull: false },
    card_id: { type: DataType.INTEGER, allowNull: false },
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "user_id", as: "user", constraints: false });
    Cart.belongsTo(models.Card, { foreignKey: "card_id", as: "card", constraints: false });
  };

  return Cart;
};
