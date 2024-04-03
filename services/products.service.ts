import { IncomingProduct, Product } from "../types/Product";
import { createSqlInsertQuery } from "../utils/createSqlInsertQuery";
import { createSqlQuery, QueryObj } from "../utils/createSqlQuery";
import { getLastRow } from "../utils/getLastRow";
import mySql from "./MySql";

const tableName = "products";

export const createProduct = async (product: Product) => {
  const { title, description, price, createdBy } = product;

  const sql = `INSERT INTO ${tableName} ${createSqlInsertQuery({ title, description, price, createdBy })}`;
  const values = [title, description, price, createdBy];
  try {
    await mySql.connection!.execute(sql, values);
    return await getLastRow<IncomingProduct>(tableName);
  } catch (err) {
    throw err;
  }
};

export const getAllProducts = async (query: QueryObj) => {
  const sql = createSqlQuery(tableName, query);
  console.log(sql);
  const [records] = await mySql.connection!.query(sql);
  return records;
};

export const getProduct = async (id: number) => {
  const [result] = await mySql.connection!.query(`SELECT * FROM ${tableName} p WHERE p.id = ?`, id);
  // @ts-ignore
  return result[0];
};

export const deleteProduct = async (id: number) => {
  const [result] = await mySql.connection!.query(`DELETE FROM ${tableName} WHERE id = ?`, id);
  return result;
};
export const updateProduct = async (product: Product, id: number) => {
  const sql = `UPDATE ${tableName} SET ${Object.entries(product).map(([key, value]) => `${key} = '${value}' `)} WHERE id = ?`;
  console.log(sql);
  const [result] = await mySql.connection!.query(sql, id);
  return result;
};
