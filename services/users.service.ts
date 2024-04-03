import jwt from "jsonwebtoken";
import { Auth, IncomingUser, User } from "../types/User";
import { createSqlInsertQuery } from "../utils/createSqlInsertQuery";
import mySql from "./MySql";
import { Password } from "./password";

const dbName = "users";

export const signUp = async (user: User) => {
  const { email, name, password } = user;
  const hashedPassword = await Password.toHash(password);

  const sql = `INSERT INTO ${dbName} ${createSqlInsertQuery({ password, email, name })}`;
  const values = [hashedPassword, email, name];
  try {
    await mySql.connection!.execute(sql, values);
    const user = await getUser(email);
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);
  } catch (err) {
    throw err;
  }
};
export const signIn = async (auth: Auth) => {
  const { email, password } = auth;
  const existingUser = await getUser(email);
  console.log(existingUser.password, password);
  if (!existingUser) {
    throw new Error("User not found");
  }

  const passwordsMatch = await Password.compare(existingUser.password, password);
  if (!passwordsMatch) {
    throw new Error("Invalid Email or Password");
  }
  return jwt.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!);
};

const getUser = async (email: string): Promise<IncomingUser> => {
  const [result] = await mySql.connection!.query(`SELECT * FROM ${dbName} WHERE email = ?`, email);
  // @ts-ignore
  return result[0];
};
