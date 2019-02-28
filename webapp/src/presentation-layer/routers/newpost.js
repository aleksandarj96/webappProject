const database = require('../../business-logic-layer/database-manager')

module.exports = function (req, res, next) {
    const title = req.body.title
    const post = req.body.post
    database.postMoviePost(title, post, "Alex")
    res.redirect("movies")
}