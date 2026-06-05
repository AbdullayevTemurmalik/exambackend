module.exports = (sequelize, DataType) => {
  const Category = sequelize.define("Category", {
    id: { type: DataType.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataType.STRING, allowNull: false },
  });

  Category.associate = (models) => {
    Category.hasMany(models.Card, { foreignKey: "category_id", as: "cards", constraints: false });
  };

  return Category;
};
