import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()
const SECRET_KEY = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer', '').trim()

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided.' })
    }

    jwt.verify(token,SECRET_KEY,(err,user)=>{
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token.' });
          }
          req.user= user
          next()
    })
}

export default authenticateToken