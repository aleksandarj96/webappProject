
const Sequelize = require('sequelize')

const sequelize = new Sequelize('webAppDatabase', 'root', 'theRootPassword', {
	host: 'database',
	dialect: 'mysql',
	define: {
		timestamps: false
	},

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
})

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.')

	})
	.catch(err => {
		console.error('Unable to connect to the database:', err)
	})


const posts = sequelize.define('posts', {
	title: {
		type: Sequelize.CHAR,
		allowNull: false
	},
	post: {
		type: Sequelize.CHAR,
		allowNull: false
	},
	username: {
		type: Sequelize.CHAR,
		allowNull: false
	},
	accountId: {
		type: Sequelize.INTEGER,
		references: "accounts",
		referencesKey: "id"
	}
})


const accounts = sequelize.define('accounts',{
	username: {
		type: Sequelize.CHAR,
		allowNull: false,
		unique: true	
	},
	password: {
		type: Sequelize.CHAR,
		allowNull: false
	}
})

const comments = sequelize.define('comments',{
	comment : {
		type: Sequelize.CHAR,
		allowNull : false
	},
	postId : {
		type: Sequelize.INTEGER.UNSIGNED,
		allowNull : false
	},
	username : {
		type: Sequelize.CHAR,
		allowNull : false,
		references : 'accounts',
		referencesKey : 'username'
	}
})

accounts.hasMany(comments, {foreignKey: 'username'})
posts.hasMany(comments, {foreignKey : 'postId'})

exports.posts = posts
exports.accounts = accounts
exports.comments = comments





