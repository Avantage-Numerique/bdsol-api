import * as fs from 'fs';
/**
 * Entry point for loggin activity into the API
 * This is a version 0, with basic console.log thing.
 */

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
enum LogFormats {
    LOG = "\x1b[37;4m%s\x1b[0;37m%j\x1b[0m",
    ERROR = "\x1b[31;4m%s\x1b[0;31m%j\x1b[0m",
    WARN = "\x1b[33;4m%s\x1b[0;33m%j\x1b[0m",
    INFO = "\x1b[90;4m%s\x1b[0;90m%j\x1b[0m",
    DEBUG = "\x1b[36;4m%s\x1b[0;36m%j\x1b[0m",
    RAW = ""
}

export default class LogHelper
{
    static printToConsole: boolean = true;
    static logToFile: boolean = false;
    
    public static showLog = true;
    public static showError = true;
    public static showWarn = true;
    public static showInfo = true;
    public static showDebug = true;
    public static showRaw = true;
    

    public routeVerbose:string;

    constructor(req:any){
        if(req.user && req.user.username && req.ip)
            this.routeVerbose = '[' + req.visitor.ip + ']' + '[' + req.user.username + ']' + '[' + req.originalUrl + ']'
    }

    //With instance
    public log(...args:any[]){
        const verbose = LogHelper.createVerbose('LOG', this.routeVerbose);
        if(LogHelper.showLog && LogHelper.printToConsole)
            console.log(LogFormats.LOG, verbose, args);
        LogHelper.logFile('LOG', verbose, args);
    }
    public error(...args:any[]){
        const verbose = LogHelper.createVerbose('ERROR', this.routeVerbose);
        if(LogHelper.showError && LogHelper.printToConsole)
            console.log(LogFormats.ERROR, verbose, args);
        LogHelper.logFile('ERROR', verbose, args);
    }

    public warn(...args:any[]){
        const verbose = LogHelper.createVerbose('WARN', this.routeVerbose);
        if(LogHelper.showError && LogHelper.printToConsole)
            console.log(LogFormats.ERROR, verbose, args);
        LogHelper.logFile('WARN', verbose, args);
    }
    public info(...args:any[]){
        const verbose = LogHelper.createVerbose('INFO', this.routeVerbose);
        if(LogHelper.showError && LogHelper.printToConsole)
            console.log(LogFormats.ERROR, verbose, args);
        LogHelper.logFile('INFO', verbose, args);
    }
    public debug(...args:any[]){
        const verbose = LogHelper.createVerbose('DEBUG', this.routeVerbose);
        if(LogHelper.showError && LogHelper.printToConsole)
            console.log(LogFormats.ERROR, verbose, args);
        LogHelper.logFile('DEBUG', verbose, args);
    }
    public raw(...args:any[]){
        const verbose = LogHelper.createVerbose('RAW', this.routeVerbose);
        if(LogHelper.showError && LogHelper.printToConsole)
            console.log(LogFormats.ERROR, verbose, args);
        LogHelper.logFile('RAW', verbose, args);
    }

    //(static) Without instance
    public static log(...args: any[]) {
        const verbose = LogHelper.createVerbose('LOG')
        if(LogHelper.showLog && LogHelper.printToConsole)
            console.log(LogFormats.LOG, verbose, args);
        LogHelper.logFile('LOG', verbose, args);
    }

    public static error(...args: any[]) {
        const verbose = LogHelper.createVerbose('ERROR')
        if(LogHelper.showError && LogHelper.printToConsole)
            console.log(LogFormats.ERROR, verbose, args);
        LogHelper.logFile('ERROR', verbose, args);
    }

    public static warn(...args: any[]) {
        const verbose = LogHelper.createVerbose('WARN')
        if(LogHelper.showWarn && LogHelper.printToConsole)
            console.log(LogFormats.WARN, verbose, args);
        LogHelper.logFile('WARN', verbose, args);
    }

    public static info(...args: any[]) {
        const verbose = LogHelper.createVerbose('INFO')
        if(LogHelper.showInfo && LogHelper.printToConsole)
            console.log(LogFormats.INFO, verbose, args);
        LogHelper.logFile('INFO', verbose, args);
    }

    public static debug(...args: any[]) {
        const verbose = LogHelper.createVerbose('DEBUG')
        if(LogHelper.showDebug && LogHelper.printToConsole)
            console.log(LogFormats.DEBUG, verbose, args);
        LogHelper.logFile('DEBUG', verbose, args);
    }

    public static raw(...args: any[]) {
        const verbose = LogHelper.createVerbose('RAW')
        if(LogHelper.showRaw && LogHelper.printToConsole)
            console.log(LogFormats.RAW, verbose, args);
        LogHelper.logFile('RAW', verbose, args);
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
    public static createVerbose(consoleMethod:any, routeVerbose?:string):string {
        const d = new Date();
        const date = d.toLocaleDateString('en-CA');
        const time = d.toLocaleTimeString('it-IT');
        const dateTime = "["+date+"]["+time+"]"
        let verbose:string = dateTime + "["+consoleMethod+"]";

        if (routeVerbose != undefined)
            verbose += routeVerbose;

        return verbose;
    }

    public static logFile(consoleMethod:any, verbose:string, data:any[]) {
        if (LogHelper.logToFile) {
            const d = new Date;
            const date = d.toLocaleDateString('en-CA');

            const path = "./logs/";
            const allFileName = date.toString()+"-all.log";

            fs.open(path+allFileName, 'a', function(err, fd){
                if (err)
                    console.log("Can't log into file")
                else {
                    fs.write(fd, verbose + data + "\n", (err) => {
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
                        fs.write(fd, verbose + data + "\n", (err) => {
                            if (err)
                                console.log(err.message);
                        });
                    }
                });
            }
        }
    }
}
