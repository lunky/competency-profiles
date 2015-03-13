module.exports = function (sequelize, DataTypes) {
	return sequelize.define("CompetencyLevel",
		//Column Definitions
		{
			Id: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			description: {
				type: DataTypes.STRING
			}
		}, {
			timestamps: false,
			createdAt: false,
			updatedAt: false,
			deletedAt: false
		});
};
