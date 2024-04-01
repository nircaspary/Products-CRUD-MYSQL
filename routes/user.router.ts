import { Router } from "express";
import { signInHandler, signUpHandler } from "../controllers/users.controller";

const userRouter = Router();

userRouter.post("/signin", signInHandler);
userRouter.post("/signup", signUpHandler);
export default userRouter;
