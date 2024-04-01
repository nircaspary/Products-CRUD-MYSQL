import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface userPayload {
  id: number;
  email: string;
}
declare global {
  namespace Express {
    interface Request {
      currentUser?: userPayload;
    }
  }
}

export const currentUser: RequestHandler = (req, res, next) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as userPayload;
    req.currentUser = payload;
  } catch (err) {
    return next(err);
  }
  next();
};
