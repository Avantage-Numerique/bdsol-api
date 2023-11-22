import FileStorage from "@src/Storage/Files/FileStorage";

export default class StaticPublicStorage extends FileStorage {
    public static basePath:string = "./public";//FileStorage.basePath +
    public static destination:string = StaticPublicStorage.basePath + "/";
}