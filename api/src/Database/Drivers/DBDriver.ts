
export default interface DBDriver {
    driverPrefix: string;
    client: any;
    db: any;
    connect: () => void;
    initDb: () => void;
    getConnectionUrl: () => string;
    getCollection: (name:string) => any;
    getModel: (name:string) => any;
}