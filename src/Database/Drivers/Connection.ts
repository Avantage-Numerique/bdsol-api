import config from "@src/config";


interface MongoDbUrlParamsContract {
    driverPrefix:string,
    haveCredentials:boolean,
    isSRV:boolean,
    db:any,
    addAuthSource:boolean
}

const buildConnectionUrlParams = (dbConfig:any):MongoDbUrlParamsContract => {
    const prefix:string = dbConfig.prefix ?? "mongodb";
    return {
        driverPrefix: prefix,
        haveCredentials: (dbConfig.user !== '' && dbConfig.password !== ''),
        isSRV: prefix.includes('+srv'),
        db: dbConfig,
        addAuthSource: dbConfig.authSource !== '' && dbConfig.authSource !== false && typeof dbConfig.authSource !== 'undefined',
    } as MongoDbUrlParamsContract;
}

const defaultUrlParams:MongoDbUrlParamsContract = buildConnectionUrlParams(config.db);

/**
 * Get the connection url in one place.
 * @param params {MongoDbUrlParamsContract} MongoDbUrlParams parameters to get the url for the db.
 * @param db string to get the connection to mongo db.
 */
const getConnectionUrl = (params:MongoDbUrlParamsContract=defaultUrlParams, db:string='') => {
    let url: string = `${getConnectionBaseUrl(params)}${db}`;
    const needAuthSourceQueryVar:boolean = params.haveCredentials && params.db.addAuthSource;
    url += `${(needAuthSourceQueryVar ? `?authSource=${params.db.authSource}` : '')}`;

    const queryVarsStartCaracter:string = needAuthSourceQueryVar ? '&' : '?';
    url += typeof params.db.additionalUrlParams === 'string' && params.db.additionalUrlParams !== '' ? `${queryVarsStartCaracter}${params.db.additionalUrlParams}` : '';

    return url;
}

/**
 *
 * @param params MongoDbUrlParams parameters to get the url for the db.
 */
const getConnectionBaseUrl = (params:MongoDbUrlParamsContract = defaultUrlParams) => {

    const credential = params.haveCredentials ? `${params.db.user}:${params.db.password}@` : '';
    let baseUrl = "";
    if (params.isSRV) {
        baseUrl = `${params.driverPrefix}://${credential}${params.db.host}/`;
    }
    if (!params.isSRV) {
        baseUrl = `${params.driverPrefix}://${credential}${params.db.host}:${params.db.port}/`;
    }
    return baseUrl;
}


const prepareUriForLoging = (uri:string):string => {
    let creds = uri.slice(uri.indexOf('://')+3, uri.indexOf('@'));
    let noCreds = uri.split(creds);
    return noCreds.join("*****:*****");
}


export {getConnectionUrl, getConnectionBaseUrl, MongoDbUrlParamsContract, prepareUriForLoging, buildConnectionUrlParams, defaultUrlParams};