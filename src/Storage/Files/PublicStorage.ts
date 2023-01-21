import LocalStorage from "./LocalStorage";

export default class PublicStorage extends LocalStorage {
    public static basePath:string = LocalStorage.basePath + "public";
    public static destination:string = PublicStorage.basePath + "/";
}