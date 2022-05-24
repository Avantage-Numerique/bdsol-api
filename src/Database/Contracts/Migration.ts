//import * as mongoDB from "mongodb";

export interface MigrationContract {
    //db: mongoDB.Db;
    //name: any;
    //collection: mongoDB.Collection | null;
    up: () => Promise<void>;
    onUp: (error:any, result:any) => void;
    down: () => Promise<void>;
    onDown: (error:any, result:any) => void;
    fake: () => Promise<boolean>;
    conditions: () => Promise<boolean>;
}