import * as fs from 'fs';
/**
 * Entry point for loggin activity into the API
 * This is a version 0, with basic console.log thing.
 */
export default class LogHelper
{
    static printToConsole: boolean = true;
    static logToFile: boolean = true;

    public static showLog = true;
    public static showError = true;
    public static showWarn = true;
    public static showInfo = true;
    public static showDebug = true;
    public static showRaw = true;


    public static log(...args: any[]) {
        if(LogHelper.showLog)
            LogHelper.finalLog('LOG', args);
    }

    public static error(...args: any[]) {
        if(LogHelper.showError)
            LogHelper.finalLog('ERROR', args);
    }

    public static warn(...args: any[]) {
        if(LogHelper.showWarn)
            LogHelper.finalLog('WARN', args);
    }

    public static info(...args: any[]) {
        if(LogHelper.showInfo)
            LogHelper.finalLog('INFO', args);
    }

    public static debug(...args: any[]) {
        if(LogHelper.showDebug)
            LogHelper.finalLog('DEBUG', args);
    }

    public static raw(...args: any[]) {
        if(LogHelper.showRaw)
            LogHelper.finalLog('RAW', args);
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
    public static finalLog(consoleMethod:any, toLog: any[], userRouteInfo?:any) {
        const d = new Date();
        const date = d.toLocaleDateString('en-CA');
        const time = d.toLocaleTimeString('it-IT');
        const dateTime = "["+date+"]["+time+"]"

        let verbose;
        if (userRouteInfo != undefined)        
            verbose = dateTime + "["+userRouteInfo+"]"+"["+consoleMethod+"]";
        else
            verbose = dateTime + "["+consoleMethod+"]"
        
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

           //First \x1b means that the first object will have this format (dateTime, [LOG] ...), 2nd param (toLog) will have the next format
           //Third is to reset format
            enum Formats {
                LOG = "\x1b[37;4m%s\x1b[0;37m%j\x1b[0m",
                ERROR = "\x1b[31;4m%s\x1b[0;31m%j\x1b[0m",
                WARN = "\x1b[33;4m%s\x1b[0;33m%j\x1b[0m",
                INFO = "\x1b[90;4m%s\x1b[0;90m%j\x1b[0m",
                DEBUG = "\x1b[36;4m%s\x1b[0;36m%j\x1b[0m",
                RAW = ""
            }
            type LogFormat = keyof typeof Formats;
            const key:LogFormat = consoleMethod;
            const format:Formats = Formats[key];

            console.log(format, verbose, toLog);
        }
        if (LogHelper.logToFile)
            LogHelper.logFile(verbose, toLog, consoleMethod);
    }

    public static logFile(verbose:any, args:any[], consoleMethod:any) {
        const d = new Date;
        const date = d.toLocaleDateString('en-CA');

        const path = "./logs/";
        const allFileName = date.toString()+"-all.log";
        const data = verbose+"["+args+"]\n";

        fs.open(path+allFileName, 'a', function(err, fd){
            if (err)
                console.log("Can't log into file")
            else {
                fs.write(fd, data, (err) => {
                    if (err)
                        console.log(err.message);
                });
            }
        });
        if (consoleMethod == "ERROR") {
            const errorFileName = date.toString()+"-error.log"
            fs.open(path+errorFileName, 'a', function(err, fd){
                if (err)
                    console.log("Can't log into file")
                else {
                    fs.write(fd, data, (err) => {
                        if (err)
                            console.log(err.message);
                    });
                }
            });
        }
    }
}
