import nedb from "nedb";

const articleDb = new nedb({ filename: "users.db", autoload: true });

export default articleDb;
