/**
 * Check by the request if the user is admin
 * by the JWT
 */
module.exports = (req, res, next) => {
        if(req.user.admin){
            next()
        } else {
            res.status(402).send('User is not admin')
        }
    }