import FileStorage from "./FileStorage";

export default class LocalStorage extends FileStorage {
    public static basePath:string = "./localStorage/";
    public static destination:string = LocalStorage.basePath + "/";
}