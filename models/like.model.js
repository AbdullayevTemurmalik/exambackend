module.exports = (sequelize, DataType) => {
  const Like = sequelize.define("Like", {
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
  });

  Like.associate = (models) => {
    Like.belongsTo(models.User, { foreignKey: "user_id", as: "user", constraints: false });
    Like.belongsTo(models.Product, { foreignKey: "product_id", as: "product", constraints: false });
  };

  return Like;
};
