const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const User = require("./user.model")(sequelize, Sequelize);
const Category = require("./category.model")(sequelize, Sequelize);
const Product = require("./product.model")(sequelize, Sequelize);
const Cart = require("./cart.model")(sequelize, Sequelize);
const Like = require("./like.model")(sequelize, Sequelize);
const Order = require("./order.model")(sequelize, Sequelize);
const OrderItem = require("./orderItem.model")(sequelize, Sequelize);

User.associate(sequelize.models);
Category.associate(sequelize.models);
Product.associate(sequelize.models);
Cart.associate(sequelize.models);
Like.associate(sequelize.models);
Order.associate(sequelize.models);
OrderItem.associate(sequelize.models);

module.exports = {
  User,
  Category,
  Product,
  Cart,
  Like,
  Order,
  OrderItem,
  sequelize,
};
