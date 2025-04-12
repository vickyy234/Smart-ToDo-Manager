const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({Message : 'Unauthorized! Please logIn'})
    }
    try {
        const decoded = jwt.verify(token, 'secure')
        req.userId = decoded.userId
        next();
    }
    catch (err) {
        res.status(403).json({Message : 'Invalid Token'})
    }
}

module.exports = authMiddleware