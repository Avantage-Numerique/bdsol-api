import {getApiConfig} from "@src/config";

export default class LogStorage {
    public static basePath:string = `${getApiConfig().serverPath}/logs`;
}