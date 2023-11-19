const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Trip = sequelize.define("Trip", {
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dates: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    purpose: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Add other trip-related fields as needed
  });

  // Define associations (if any)
  Trip.associate = (models) => {
    // Example association for trip and user
    Trip.belongsTo(models.User, { foreignKey: "userId" });
    // Example association for trip and accommodations
    Trip.hasMany(models.Accommodation, { foreignKey: "tripId" });
  };

  return Trip;
};
