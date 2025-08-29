const jwt= require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check for Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT_SECRET is not set' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log('✅ JWT verified. User ID:', payload.id);
        req.userId = payload.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};