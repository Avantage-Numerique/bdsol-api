export interface DBDriver {
    config: any;
    driverPrefix: string;
    client: any;
    db: any;
    baseUrl: string,
    providers: any,
    connect: () => void;
    disconnect: () => void;
    setupIndexes: () => void;
    removeIndexes: () => void;
    initDb: () => void;
    initProviders: () => void;
    connectionUrl: (db?:string) => string;
    connectionBaseUrl: () => string;
    getCollection: (name:string) => any;
    getModel: (name:string) => any;
    isConnected: () => boolean;
    urlToLog: (url:string) => void;
}