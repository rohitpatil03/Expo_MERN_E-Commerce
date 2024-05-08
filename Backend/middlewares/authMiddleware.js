import express from 'express';
import jwt from 'jsonwebtoken'
var router = express.Router();

const isAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Missing Token" });
  }
  
  jwt.verify(token.split(' ')[1], process.env.JWT_ACCESS_KEY, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).json({ message: "Invalid Token" });
    } else {
      req.username = decoded.username;
      next();
    }
  });
};

export default isAuthenticated