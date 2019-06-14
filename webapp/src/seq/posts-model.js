module.exports = function(sequelize, DataTypes){
	return sequelize.define('posts', {
		title : {
			type: DataTypes.CHAR,
			allowNull: false
		},
		post: {
			type: DataTypes.CHAR,
			allowNull: false
        },
        username: {
            type: DataTypes.CHAR,
            allowNull: false
		},
		accountId: {
			type: DataTypes.INTEGER,
			references: "accounts",
			referencesKey: "id"
		}

			
	})


	
}