module.exports = (sequelize, DataType) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    description: {
      type: DataType.TEXT,
    },
    price: {
      type: DataType.DECIMAL(10, 2),
      allowNull: false,
    },
    imageUrl: {
      type: DataType.TEXT, // Changed from STRING to TEXT for long URLs
      allowNull: true,
    },
    manufactureDate: {
      type: DataType.DATE,
    },
    category_id: {
      type: DataType.INTEGER,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, { foreignKey: "category_id", as: "category", constraints: false });
    Product.hasMany(models.Cart, { foreignKey: "product_id", as: "carts", constraints: false });
    Product.hasMany(models.Like, { foreignKey: "product_id", as: "likes", constraints: false });
    Product.hasMany(models.OrderItem, { foreignKey: "product_id", as: "orderItems", constraints: false });
  };

  return Product;
};
