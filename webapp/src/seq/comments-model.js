module.exports = function(sequelize, DataTypes){
	return sequelize.define('comments', {
		comment: {
			type: DataTypes.CHAR,
			allowNull: false
		},
		postid: {
			type: DataTypes.CHAR,
            allowNull: false,
            references: 'posts',
            referencesKey: 'id'
        },
        username : {
            type: DataTypes.CHAR,
            allowNull: false,
            references: 'accounts',
            referencesKey: 'username'
        }		
	})	
}
