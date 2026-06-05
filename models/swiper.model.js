module.exports = (sequelize, DataType) => {
  const Swiper = sequelize.define("Swiper", {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataType.TEXT,
      allowNull: false,
    },
  });

  return Swiper;
};
