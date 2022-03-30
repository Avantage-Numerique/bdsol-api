import MongoDBDriver from "./Drivers/MongoDBDriver";
import DBDriver from "./Drivers/DBDriver";

const database: DBDriver = new MongoDBDriver();
database.connect();

export default database;