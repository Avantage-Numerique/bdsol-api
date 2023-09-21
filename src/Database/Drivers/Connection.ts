import config from "@src/config";


interface MongoDbUrlParamsContract {
    driverPrefix?:string,
    haveCredentials?:boolean,
    isSRV?:boolean,
    db?:any
}

const defaultUrlParams:MongoDbUrlParamsContract = {
    driverPrefix:config.db.prefix,
    haveCredentials:true,
    isSRV:false,
    db: config.db
};

/**
 * Get the connection url in one place.
 * @param db string to get the connection to mongo db.
 * @param params MongoDbUrlParams parameters to get the url for the db.
 */
const getConnectionUrl = (db:string='bdsol-data', params:MongoDbUrlParamsContract=defaultUrlParams) => {
    const url: string = `${getConnectionBaseUrl(params)}${db}${(params.haveCredentials ? `?authSource=${params.db.authSource}` : '')}${params.db.additionalUrlParams}`;
    return url;
}

/**
 *
 * @param params MongoDbUrlParams parameters to get the url for the db.
 */
const getConnectionBaseUrl = (params:MongoDbUrlParamsContract = defaultUrlParams) => {
    const credential = "";//params.haveCredentials ? `${params.db.user}:${params.db.password}@` : '';
    let baseUrl = "";
    if (params.isSRV) {
        baseUrl = `${params.driverPrefix}://${credential}${params.db.host}/`;
    }
    if (!params.isSRV) {
        baseUrl = `${params.driverPrefix}://${credential}${params.db.host}:${params.db.port}/`;
    }
    return baseUrl;
}

export {getConnectionUrl, getConnectionBaseUrl, MongoDbUrlParamsContract};