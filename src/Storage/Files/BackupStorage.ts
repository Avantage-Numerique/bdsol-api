import LocalStorage from "./LocalStorage";

export default class BackupStorage {
    public static basePath:string = `${LocalStorage.basePath}backup`;
}