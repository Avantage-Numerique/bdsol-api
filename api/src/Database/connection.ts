import MongoDBDriver, {DBDriver} from "./Drivers/MongoDBDriver";

const database: DBDriver = new MongoDBDriver();
database.connect();

export default database;