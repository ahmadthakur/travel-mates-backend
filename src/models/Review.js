const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Review = sequelize.define("Review", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Add other review-related fields as needed
  });

  // Define associations (if any)
  Review.associate = (models) => {
    // Example association for review and user
    Review.belongsTo(models.User, { foreignKey: "userId" });
    // Example association for review and accommodation
    Review.belongsTo(models.Accommodation, { foreignKey: "accommodationId" });
  };

  return Review;
};
