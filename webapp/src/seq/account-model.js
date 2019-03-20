module.exports = function(sequelize, DataTypes){
	return sequelize.define('accounts', {
		username : {
			type: DataTypes.CHAR,
			unique: true,
			allowNull: false
		},
		password : {
			type: DataTypes.CHAR,
			allowNull: false
		}
		
	})
	
}

