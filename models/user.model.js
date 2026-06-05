const bcrypt = require("bcrypt");

module.exports = (sequelize, DataType) => {
  const User = sequelize.define("User", {
    id: { type: DataType.INTEGER, autoIncrement: true, primaryKey: true },
    userName: { type: DataType.STRING, allowNull: false, unique: true },
    firstName: { type: DataType.STRING, allowNull: false },
    lastName: { type: DataType.STRING, allowNull: false },
    gender: { type: DataType.STRING },
    age: { type: DataType.INTEGER },
    email: { type: DataType.STRING, allowNull: false, unique: true },
    password: { type: DataType.STRING, allowNull: false },
  });

  User.associate = (models) => {
    User.hasMany(models.Cart, { foreignKey: "user_id", as: "carts", constraints: false });
    User.hasMany(models.Like, { foreignKey: "user_id", as: "likes", constraints: false });
  };

  User.beforeSave(async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  return User;
};
