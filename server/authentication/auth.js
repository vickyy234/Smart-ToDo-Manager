const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message : 'Session timeout! Please login again'})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next();
    }
    catch (err) {
        res.status(403).json({message : 'Invalid Token'})
    }
}

module.exports = authMiddleware