module.exports = (sequelize, DataType) => {
  const News = sequelize.define("News", {
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

  return News;
};
