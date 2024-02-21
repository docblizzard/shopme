import crypto from 'crypto'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config();


export function generateAccessToken(username) {
    return jwt.sign(username, process.env.TOKEN, { expiresIn: '1h' });
}

export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);
    console.log('correct token')
    jwt.verify(token, process.env.TOKEN, (err, user) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
}

export function invalidateToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(200).json({ message: 'Logout successful' });
      }

      return res.status(401).json({ message: 'Token invalidated during logout' });
    });
  } else {
    res.status(200).json({ message: 'Logout successful' });
  }
}
