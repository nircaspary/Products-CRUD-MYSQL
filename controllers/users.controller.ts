import { RequestHandler } from "express";
import { signIn, signUp } from "../services/users.service";
import { IncomingUser, User } from "../types/User";

export const signInHandler: RequestHandler<{}, {}, User> = async (req, res) => {
  try {
    const jwt = await signIn(req.body);
    req.session = { jwt };
    res.status(201).json({ jwt });
  } catch (err) {
    console.log(err);
  }
};

export const signUpHandler: RequestHandler<{}, {}, IncomingUser> = async (req, res) => {
  try {
    const jwt = await signUp(req.body);
    req.session = { jwt };
    res.status(200).json({ jwt });
  } catch (err) {
    console.log(err);
  }
};
