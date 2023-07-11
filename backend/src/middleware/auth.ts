import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
dotenv.config();

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // ... lógica de autenticação ...
  const token = req.headers.authorization;
  if (!token) {
    console.log('Access denied. No token provided.');
    return res
      .status(401)
      .send('Access denied. No token provided.');
  }
  const segredo = process.env.SECRET || 'segredo';
  jwt.verify(token, segredo, (err, decoded) => {
    if (!err) {
      next();
      return;
    }
    res.status(400).json({
      message: 'Invalid token.',
      erro: err,

    });
  });
};
