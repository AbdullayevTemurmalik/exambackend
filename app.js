const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./models");
const setupSwagger = require("./swagger/swagger");

const UserRoute = require("./routes/user.route");
const CategoryRoute = require("./routes/category.route");
const ProductRoute = require("./routes/product.route");
const CartRoute = require("./routes/cart.route");
const LikeRoute = require("./routes/like.route");
const SwiperRoute = require("./routes/swiper.route");
const NewsRoute = require("./routes/news.route");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", UserRoute);
app.use("/categories", CategoryRoute);
app.use("/products", ProductRoute);
app.use("/carts", CartRoute);
app.use("/likes", LikeRoute);
app.use("/swiper", SwiperRoute);
app.use("/news", NewsRoute);

setupSwagger(app);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected successfully.");
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
  console.error("Database connection error:", err);
});
