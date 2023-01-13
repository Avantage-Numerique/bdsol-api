
export default class FileStorage {
    static basePath:string;
    static destination:string;

    public static filename(originFile:any) {
        return originFile.originalname;
    }

}