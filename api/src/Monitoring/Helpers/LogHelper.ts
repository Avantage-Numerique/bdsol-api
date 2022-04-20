/**
 * Entry point for loggin activity into the API
 * This is a version 0, with basic console.log thing.
 */
export default class LogHelper
{
    static printToConsole: boolean = true;

    public static log(...args: any[]) {
        LogHelper.finalLog('log', args);
    }

    public static error(...args: any[]) {
        LogHelper.finalLog('info', args);
    }

    public static warn(...args: any[]) {
        LogHelper.finalLog('warn', args);
    }

    public static info(...args: any[]) {
        LogHelper.finalLog('error', args);
    }


    public static finalLog(consoleMethod:string, toLog: any[]) {
        if (LogHelper.printToConsole) {

            if (consoleMethod === 'log') {
                console.log(toLog);
            }

            if (consoleMethod === 'error') {
                console.error(toLog);
            }

            if (consoleMethod === 'warn') {
                console.warn(toLog);
            }

            if (consoleMethod === 'info') {
                console.info(toLog);
            }
        }
        LogHelper.logToFile(toLog);
    }

    public static logToFile(args:any[]) {
        return args;
    }
}
//red color console : https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
//console.log('\x1b[36m', 'sometext' ,'\x1b[0m');