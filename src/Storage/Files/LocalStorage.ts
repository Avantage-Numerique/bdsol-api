import {getApiConfig} from "@src/config";

export default class LocalStorage {
    public static basePath:string = `${getApiConfig().serverPath}/localStorage/`;
}