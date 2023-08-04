import {spawn} from "child_process";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";

const MongoSpawn = async (command:string, params:any) => {

    const logPrefix:string = `[Job][mongoSpawn][${command}]`;

    let mongoSpawn = spawn(command, mongoParamsToArgs(params));

    LogHelper.info(`${logPrefix} ${command} this uri : ${params.uri}`);

    let backupVerbose:string = "";
    mongoSpawn.stdout.setEncoding('utf8');
    mongoSpawn.stdout.on('data', (data) => {
        data = data.toString();
        LogHelper.info(`${logPrefix} stdout ${params.dbName}`, data);
        backupVerbose += data;
    });

    mongoSpawn.stderr.setEncoding('utf8');
    mongoSpawn.stderr.on('data', (data) => {
        data = data.toString();
        LogHelper.error(`${logPrefix} stderr ${params.dbName}`, data);
        backupVerbose += data;
    });

    mongoSpawn.on('close', (code) => {
        LogHelper.info(`${logPrefix} Backup fininished for ${params.dbName} with code ${code} full output `, backupVerbose);
    });

    mongoSpawn.on('exit', (code, signal) => {
        console.log('trace : ',backupVerbose);
        if (code) {
            LogHelper.error(`${logPrefix} Backup process exited with code`, code, `(${typeof code})`);
        }
        if (signal) {
            LogHelper.error(`${logPrefix} Backup process was killed with singal`, signal, `(${typeof signal})`);
        }

        if (!signal && !code) {
            LogHelper.info(`${logPrefix} Successfully backup the database ${params.dbName}`);
        }
    });
}

const mongoParamsToArgs = (params:any) => {
    let args:Array<string> = [
        `--uri=${params.uri}`
    ];
    if (params.archive) {
        args.push(`--archive=${params.archive}`);
    }
    if (params.gzip) {
        args.push('--gzip');
    }
    return args;
}

export {MongoSpawn, mongoParamsToArgs};