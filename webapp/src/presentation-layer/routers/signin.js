const accountValidator = require('../../business-logic-layer/account-validator')

module.exports = function (req, res, next) {
    const username = req.body.username
    const password = req.body.password
    accountValidator.validateAccount(username, password, function(err, account){
        console.log("Print session")
        req.session.account = account
        console.log(account + "Session")
        const model = {
            account: account
        }
        res.render("home.hbs", model)
    })
}