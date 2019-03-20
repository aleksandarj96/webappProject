module.exports = function(sequelize, DataTypes){
	return sequelize.define('movieposts', {
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
        }
		
	})
	
}