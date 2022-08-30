import { transpileModule } from "typescript";

/**
 * Entry point for loggin activity into the API
 * This is a version 0, with basic console.log thing.
 */
export default class LogHelper
{
    static printToConsole: boolean = true;

    public BLUE:string = "";
    public static showLog = true;
    public static showError = true;
    public static showWarn = true;
    public static showInfo = true;
    public static showDebug = true;
    public static showRaw = true;


    public static log(...args: any[]) {
        if(LogHelper.showLog)
            LogHelper.finalLog('log', args);
    }

    public static error(...args: any[]) {
        if(LogHelper.showError)
            LogHelper.finalLog('error', args);
    }

    public static warn(...args: any[]) {
        if(LogHelper.showWarn)
            LogHelper.finalLog('warn', args);
    }

    public static info(...args: any[]) {
        if(LogHelper.showInfo)
            LogHelper.finalLog('info', args);
    }

    public static debug(...args: any[]) {
        if(LogHelper.showDebug)
            LogHelper.finalLog('debug', args);
    }

    public static raw(...args: any[]) {
        if(LogHelper.showRaw)
            LogHelper.finalLog('raw', args);
    }

    /** 
     *  @method finalLog applique des styles aux logs, les affiche et les inscrit dans un fichier log.
     *  @desc Explains syntax
     *  @see {@link https://simplernerd.com/js-console-colors/}
     *  @desc Explains supported specifier that converts "%" to types (string/json...)
     *  @see {@link https://www.geeksforgeeks.org/node-js-util-format-method/} 
     *  @desc Other usefull doc
     *  @see {@link https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color}
     */
    public static finalLog(consoleMethod:string, toLog: any[]) {
        if (LogHelper.printToConsole) {

            /*
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
           const d = new Date();
           const date = d.toLocaleDateString('en-CA');
           const time = d.toLocaleTimeString('it-IT');
           const dateTime = "["+date+"]["+time+"]"

            switch(consoleMethod){
                case 'log': {
                    console.log("\x1b[37;4m%s\x1b[0;37m%j\x1b[0m", dateTime+"[LOG]", toLog); break;
                }
                case 'error': {
                    console.log("\x1b[31;4m%s\x1b[0;31m%j\x1b[0m", dateTime+"[ERROR]", toLog); break;
                }
                case 'warn': {
                    console.log("\x1b[33;4m%s\x1b[0;33m%j\x1b[0m", dateTime+"[WARN]", toLog); break;
                }
                case 'info': {
                    console.log("\x1b[90;4m%s\x1b[0;90m%j\x1b[0m", dateTime+"[INFO]", toLog); break;
                }
                case 'debug': {
                    console.log("\x1b[36;4m%s\x1b[0;36m%j\x1b[0m", dateTime+"[DEBUG]", toLog); break;
                }
                case 'raw': {
                    console.log("[DEBUG]", toLog); break;
                }
            }
        }
        LogHelper.logToFile(toLog);
    }

    public static logToFile(args:any[]) {
        //nothing yet.
    }
}
