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
        LogHelper.finalLog('error', args);
    }

    public static warn(...args: any[]) {
        LogHelper.finalLog('warn', args);
    }

    public static info(...args: any[]) {
        LogHelper.finalLog('info', args);
    }

    public static debug(...args: any[]) {
        LogHelper.finalLog('debug', args);
    }


    public static finalLog(consoleMethod:string, toLog: any[]) {
        if (LogHelper.printToConsole) {

            /*https://simplernerd.com/js-console-colors/
            https://www.geeksforgeeks.org/node-js-util-format-method/

               \x1b            [          97        ;      4             m               %   s 
              EscChar      start func    style    add2nd style       func name     1stparam.ToString  
            
            style : 0-reset, 1-bold, 3-italic, 4-underline, 30-37 basecolor txt, 40-47 basecolor background, 90-97 lightcolor txt, 100-107 lightcolor background
            
            Base color      Light color
            0 = Black       0 = Gray
            1 = Red         1 = Light Red
            2 = Green       2 = Light Green
            3 = Yellow      3 = Light Yellow
            4 = Blue        4 = Light Blue
            5 = Purple      5 = Light Purple
            6 = Aqua        6 = Light Aqua
            7 = White       7 = Bright White
            */

            switch(consoleMethod){
                case 'log': {
                    console.log("\x1b[37;4m%s\x1b[0;37m%s\x1b[0m", "[LOG]", " - "+toLog); break;
                }
                case 'error': {
                    console.log("\x1b[31;4m%s\x1b[0;31m%s\x1b[0m", "[ERROR]", " - "+toLog); break;
                }
                case 'warn': {
                    console.log("\x1b[33;4m%s\x1b[0;33m%s\x1b[0m", "[WARN]", " - "+toLog); break;
                }
                case 'info': {
                    console.log("\x1b[90;4m%s\x1b[0;90m%s\x1b[0m", "[INFO]", " - "+toLog); break;
                }
                case 'debug': {
                    console.log("\x1b[36;4m%s\x1b[0;36m%s\x1b[0m", "[DEBUG]", " - "+toLog); break;
                }
            }
        }
        LogHelper.logToFile(toLog);
    }

    public static logToFile(args:any[]) {
        return args;
    }
}