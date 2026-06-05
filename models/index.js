const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user.model")(sequelize, Sequelize);
const Category = require("./category.model")(sequelize, Sequelize);
const Card = require("./product.model")(sequelize, Sequelize);
const Cart = require("./cart.model")(sequelize, Sequelize);
const Like = require("./like.model")(sequelize, Sequelize);
const Swiper = require("./swiper.model")(sequelize, Sequelize);
const News = require("./news.model")(sequelize, Sequelize);

User.associate(sequelize.models);
Category.associate(sequelize.models);
Card.associate(sequelize.models);
Cart.associate(sequelize.models);
Like.associate(sequelize.models);

module.exports = {
  User,
  Category,
  Card,
  Cart,
  Like,
  Swiper,
  News,
  sequelize,
};
