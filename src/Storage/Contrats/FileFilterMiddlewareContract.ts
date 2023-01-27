import multer, {FileFilterCallback} from "multer";

export default interface FileFilterMiddlewareContract {
    req: Request;
    file: Express.Multer.File;
    callback: multer.FileFilterCallback;
    middleware(req:Request, file:any, callback:any):FileFilterCallback;
}