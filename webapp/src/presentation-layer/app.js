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
const databaseManager = require('../business-logic-layer/database-manager')
const accountRepository = require('../data-access-layer/account-repository')
const databaseFunctions = require('../data-access-layer/database-functions')
const db = require('../data-access-layer/db.js')
const variousRouter = require('./routers/various-router')
const accountRouter = require('./routers/account-router')
const apiRouter = require('./routers/api_router')

// Setup express-handlebars.
app.set('views', path.join(__dirname, 'views'))
const container = awilix.createContainer()
container.register("databaseFunctions", awilix.asFunction(databaseFunctions))
container.register("db", awilix.asValue(db))
container.register("accountRepository", awilix.asFunction(accountRepository))
container.register("databaseManager", awilix.asFunction(databaseManager))
container.register("variousRouter", awilix.asFunction(variousRouter))
container.register("accountManager", awilix.asFunction(accountManager))
container.register("accountRouter", awilix.asFunction(accountRouter))
container.register("accountValidator", awilix.asFunction(accountValidator))
container.register("apiRouter", awilix.asFunction(apiRouter))

const theAccountRouter = container.resolve('accountRouter')
const theVariousRouter = container.resolve('variousRouter')
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

app.use(expressSession({
	secret: 'forum',
	resave: false,
	store: new redisStore({ host: 'redis', port: 6379 ,ttl :  260}),
    saveUninitialized: false,
}))

app.use(express.urlencoded({ extended: false }))

// Attach all routers.
app.use('/', theVariousRouter)
app.use('/accounts', theAccountRouter)
app.use('/api', apiRouter)
// Start listening for incoming HTTP requests!
app.listen(8080, function(){
	console.log('Running on 8080!')
})