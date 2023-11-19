const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Accommodation = sequelize.define("Accommodation", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add other accommodation-related fields as needed
  });

  // Define associations (if any)
  Accommodation.associate = (models) => {
    // Example association for accommodation and trips
    Accommodation.belongsTo(models.Trip, { foreignKey: "tripId" });
    // Example association for accommodation and reviews
    Accommodation.hasMany(models.Review, { foreignKey: "accommodationId" });
  };

  return Accommodation;
};
