const jwt = require('jsonwebtoken')

async function jwtChecker(req, res, next) {
    let jwtToken = req.headers.authorization.replace("Bearer ", "");
    
    try {
        jwt.verify(jwtToken, 'thisIsASecretCode');
        console.log(jwtToken)
        next();
    }
    catch (error) {
        console.log(error)
        res.status(500).send("You have no permission to see this! Please sign up")
    }
}

module.exports = jwtChecker