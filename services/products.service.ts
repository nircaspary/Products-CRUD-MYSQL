import { IncomingProduct, Product } from "../types/Product";
import { createSqlQuery } from "../utils/createSqlQuery";
import { getLastRow } from "../utils/getLastRow";
import mySql from "./MySql";

const tableName = "`products`";

export const createProduct = async (product: Product) => {
  const { title, description, price, createdBy } = product;

  const sql = `INSERT INTO ${tableName} ${createSqlQuery({ title, description, price, createdBy })}`;
  const values = [title, description, price, createdBy];
  try {
    await mySql.connection!.execute(sql, values);
    return await getLastRow<IncomingProduct>(tableName);
  } catch (err) {
    throw err;
  }
};

export const getAllProducts = async () => {
  const [records] = await mySql.connection!.query(`SELECT * FROM ${tableName}`);
  return records;
};

export const getProduct = async (id: number) => {
  const [result] = await mySql.connection!.query(`SELECT * FROM ${tableName} WHERE id = ?`, id);
  // @ts-ignore
  return result[0];
};

export const deleteProduct = async (id: number) => {
  const [result] = await mySql.connection!.query(`DELETE FROM ${tableName} WHERE id = ?`, id);
  return result;
};
export const updateProduct = async (product: Product, id: number) => {
  const sql = `UPDATE ${tableName} SET ${Object.entries(product).map(([key, value]) => `${key} = ${value}`)} WHERE id = ?`;
  const [result] = await mySql.connection!.query(sql, id);
  return result;
};
