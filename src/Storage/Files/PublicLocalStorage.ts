import LocalStorage from "./LocalStorage";

export default class PublicLocalStorage extends LocalStorage {
    public static basePath:string = LocalStorage.basePath + "public";
    public static destination:string = PublicLocalStorage.basePath + "/";
}