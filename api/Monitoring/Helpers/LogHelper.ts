/**
 * Entry point for loggin activity into the API
 * This is a version 0, with basic console.log thing.
 */
export default class LogHelper
{
    public static log(message:string, type: string = 'log', printToConsole:boolean=true) {

        if (type === 'log') {
            LogHelper.defaultType(message, printToConsole);
        }

        if (type === 'error') {
            LogHelper.error(message, printToConsole);
        }

        if (type === 'warn') {
            LogHelper.warn(message, printToConsole);
        }
        LogHelper.logToFile(message);
    }

    public static defaultType(message:string, printToConsole:boolean=true) {
        if (printToConsole) {
            console.log(message);
        }
    }

    public static error(message:string, printToConsole:boolean=true) {
        if (printToConsole) {
            console.error(message);
        }
    }

    public static warn(message:string, printToConsole:boolean=true) {
        if (printToConsole) {
            console.warn(message);
        }
    }

    public static logToFile(message:string) {
        return message;
    }
}