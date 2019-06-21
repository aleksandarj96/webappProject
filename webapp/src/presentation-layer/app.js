const path = require('path')
const express = require('express')
const expressHandlebars = require('express-handlebars')
const expressSession = require('express-session')
const bodyParser = require("body-parser")
const redisStore = require('connect-redis')(expressSession)
const app = express()
const awilix = require('awilix')

const accountManager = require('../business-logic-layer/account-manager')
const accountValidator = require('../business-logic-layer/account-validator')
//const databaseManager = require('../business-logic-layer/database-manager')
const postManager = require('../business-logic-layer/post-manager')
const commentManager = require('../business-logic-layer/comment-manager')
const accountRepository = require('../data-access-layer/account-repository')
const databaseFunctions = require('../data-access-layer/database-functions')
//const db = require('../data-access-layer/db.js')
const db = require('../seq/db.js')

const accountRepositorySeq = require('../seq/account-repository')
const databaseFunctionsSeq = require('../seq/database-functions')

const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const apiRouter = require('./routers/api_router')
const postRouter = require('./routers/post-router')

// Setup express-handlebars.
app.set('views', path.join(__dirname, 'views'))
const container = awilix.createContainer()
container.register("databaseFunctions", awilix.asFunction(databaseFunctionsSeq))
container.register("db", awilix.asValue(db))
container.register("accountRepository", awilix.asFunction(accountRepositorySeq))
//container.register("databaseManager", awilix.asFunction(databaseManager))
container.register("commentManager", awilix.asFunction(commentManager))
container.register("postManager", awilix.asFunction(postManager))
container.register("variousRouter", awilix.asFunction(variousRouter))
container.register("postRouter", awilix.asFunction(postRouter))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))
container.register("accountValidator", awilix.asFunction(accountValidator))
container.register("apiRouter", awilix.asFunction(apiRouter))

const theAccountRouter = container.resolve('accountRouter')
const theApiRouter = container.resolve('apiRouter')
const theVariousRouter = container.resolve('variousRouter')
const thePostRouter = container.resolve('postRouter')

app.engine('hbs', expressHandlebars({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'layouts')
}))

// Handle static files in the public folder.
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({
	extended: false
}))
app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader("Access-Control-Allow-Methods", "*")
	res.setHeader("Access-Control-Allow-Headers", "*")
	next()
})
app.use(bodyParser.json())
app.use(expressSession({
	secret: 'forum',
	resave: false,
	store: new redisStore({
		host: 'redis',
		port: 6379,
		ttl: 260
	}),
	saveUninitialized: false,
}))

app.use(express.urlencoded({
	extended: false
}))

// Attach all routers.

app.use('/api', theApiRouter)
app.use('/', theVariousRouter)
app.use('/accounts', theAccountRouter)
app.use('/', thePostRouter)


// Start listening for incoming HTTP requests!
app.listen(8080, function () {
	console.log('Running on 8080!')
})


app.use(function (req, res, next) {
	if (res.status(404)) {
	  res.send('404: File Not Found :( ');
	}
  });