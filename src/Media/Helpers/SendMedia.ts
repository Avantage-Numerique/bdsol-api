import {now} from "@src/Helpers/DateTime";
import path from "path";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {StatusCodes} from "http-status-codes";
import {Response} from "express";

const defaultSendFileOptions:any = {
    //Removed this root option and added path.resolve to the return work with targetMediaPath
    //root: config.basepath,
    dotfiles: "deny",
    headers: {
        'x-timestamp': now(),
        'x-sent': true
    }
};

const SendMedia = async (filepath:string, res:Response):Promise<any> => {
    //type('image/jpeg')
    const targetMediaPath = path.resolve(path.join(`${filepath}`));
    await res.sendFile(
        targetMediaPath,
        defaultSendFileOptions,
        (error) => {
            if (error){
                LogHelper.info("Media : NOT_FOUND", error);
                res.status(StatusCodes.NOT_FOUND);//do not use send, it return a : can't send header another time error.
                res.end();
            }
            else {
                res.end();
            }
        }
    );
}
export default SendMedia;
export {defaultSendFileOptions};