import mysql from "mysql2/promise";

// Create the connection to database

class MySql {
  connection?: mysql.Connection;
  initConnection = async (config: mysql.ConnectionOptions) => {
    if (!this.connection) {
      this.connection = await mysql.createConnection(config);
    }
  };
}

const mySql = new MySql();
export default mySql;
