module.exports = (sequelize, DataType) => {
  const News = sequelize.define("News", {
    id: {
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  return News;
};
