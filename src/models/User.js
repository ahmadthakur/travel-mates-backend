const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Add the timestamps option
      timestamps: true,
      // Specify the column names (optional, Sequelize defaults to 'createdAt' and 'updatedAt')
      createdAt: "accountCreatedAt",
      updatedAt: "accountUpdatedAt",
    }
  );

  User.associate = (models) => {
    // Example association for user and trips
    User.hasMany(models.Trip, { foreignKey: "userId" });
  };

  return User;
};
