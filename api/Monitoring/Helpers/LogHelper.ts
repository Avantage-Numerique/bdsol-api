/**
 * Entry point for loggin activity into the API
 * This is a version 0, with basic console.log thing.
 */
export default class LogHelper
{
    public static log(message:string, printToConsole:boolean=true) {
        if (printToConsole) {
            console.log(message);
        }
        LogHelper.logToFile(message);
    }

    public static logToFile(message:string) {
        return true;
    }
}