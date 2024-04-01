import mySql from "../services/MySql";
export const getLastRow = async <T>(tableName: string) => {
  const [rows] = await mySql.connection!.execute(`SELECT * FROM ${tableName} WHERE id = LAST_INSERT_ID()`);
  //@ts-ignore
  return rows[0] as T;
};
