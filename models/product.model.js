module.exports = (sequelize, DataType) => {
  const Card = sequelize.define("Card", {
    id: { type: DataType.INTEGER, autoIncrement: true, primaryKey: true },
    image: { type: DataType.TEXT, allowNull: true },
    price: { type: DataType.INTEGER, allowNull: false },
    description: { type: DataType.TEXT },
    category_id: { type: DataType.INTEGER },
    discount: { type: DataType.INTEGER },
    stars: { type: DataType.INTEGER },
  });

  Card.associate = (models) => {
    Card.belongsTo(models.Category, { foreignKey: "category_id", as: "category", constraints: false });
    Card.hasMany(models.Cart, { foreignKey: "card_id", as: "carts", constraints: false });
    Card.hasMany(models.Like, { foreignKey: "product_id", as: "likes", constraints: false });
  };

  return Card;
};
