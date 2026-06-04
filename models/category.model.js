module.exports = (sequelize, DataType) => {
  const Category = sequelize.define("Category", {
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
  });

  Category.associate = (models) => {
    Category.hasMany(models.Product, { foreignKey: "category_id", as: "products", constraints: false });
  };

  return Category;
};
