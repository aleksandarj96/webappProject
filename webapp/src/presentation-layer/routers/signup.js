const accountManager = require('../../business-logic-layer/account-manager')

module.exports = function (req, res, next) {
    const username = req.body.username
    const password = req.body.password
    accountManager.createAccount(username, password, function (errors, accounts) {
        console.log(errors, accounts)
        const model = {
            errors: errors,
            accounts: accounts
        }
        res.render("accounts-sign-in.hbs", model)
    })
}