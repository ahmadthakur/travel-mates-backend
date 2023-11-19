const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Destination = sequelize.define("Destination", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    climate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Add other destination-related fields as needed
  });

  // Define associations (if any)
  Destination.associate = (models) => {
    // Example association for destination and trips
    Destination.hasMany(models.Trip, { foreignKey: "destinationId" });
  };

  return Destination;
};
