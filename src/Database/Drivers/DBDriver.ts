export interface DBDriver {
    config: any;
    driverPrefix: string;
    client: any;
    db: any;
    baseUrl: string,
    providers: any,
    connect: () => void;
    initDb: () => void;
    getConnectionUrl: (db?:string) => string;
    getConnectionBaseUrl: () => string;
    getCollection: (name:string) => any;
    getModel: (name:string) => any;
}