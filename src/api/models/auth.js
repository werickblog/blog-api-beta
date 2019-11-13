import nedb from "nedb";

const articleDb = new nedb({ filename: "articles.db", autoload: true });

export default articleDb;
