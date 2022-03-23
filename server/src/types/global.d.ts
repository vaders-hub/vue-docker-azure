import mysql from "mysql2";

declare global {
  // eslint-disable-next-line no-var
  var db: mysql.Connection;
}

export {};
