
export interface MigrationContract {
    //db: mongoDB.Db;
    //name: any;
    //collection: mongoDB.Collection | null;
    up: (entity:string) => Promise<void>;
    onUp: (error:any, result:any) => void;
    down: () => Promise<void>;
    onDown: (error:any, result:any) => void;
    fake: (data:any) => Promise<any>
}