const jwt = require('jsonwebtoken');
const JWT_SIGN = 'hardikdesai$7';

const fetchUser = (req, res, next) => {
    // get the user from jwt token and add id to req object
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).json({ error: "Please Authenticate with valid token" })
    }

    try {
        const data = jwt.verify(token, JWT_SIGN)
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Please Authenticate with valid token" })
    }
}


module.exports = fetchUser