import {spawn} from "child_process";
import LogHelper from "@src/Monitoring/Helpers/LogHelper";
import {prepareUriForLoging} from "@database/Drivers/Connection";

const MongoSpawn = async (command:string, params:any) => {

    const logPrefix:string = `[Job][mongoSpawn][${command}]`;

    let mongoSpawn = spawn(command, mongoParamsToArgs(params));

    let uri:string = `${params.uri}`;

    LogHelper.info(`${logPrefix} ${command} with params ${mongoParamsToArgs(params, true)} this uri : ${prepareUriForLoging(uri)}`);

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
        LogHelper.info(`${logPrefix} stderr ${params.dbName}`, data);
        backupVerbose += data;
    });

    mongoSpawn.on('close', (code) => {
        LogHelper.info(`${logPrefix} fininished for ${params.dbName ?? params.nsTo} with code ${code} full output `, backupVerbose);
    });

    mongoSpawn.on('exit', (code, signal) => {
        LogHelper.info(`${logPrefix} process exited`);
        if (code) {
            LogHelper.error(`${logPrefix} process exited with code`, code, `(${typeof code})`);
        }
        if (signal) {
            LogHelper.error(`${logPrefix} process was killed with signal`, signal, `(${typeof signal})`);
        }

        if (!signal && !code) {
            LogHelper.info(`${logPrefix} Successful ${params.dbName}`);
        }
    });
    return mongoSpawn;
}

const mongoParamsToArgs = (params:any, forlogs=false) => {
    if (forlogs) {
        params.uri = prepareUriForLoging(params.uri);
    }
    let args:Array<string> = [
        `--uri=${params.uri}`
    ];
    if (params.archive) {
        args.push(`--archive=${params.archive}`);
    }
    if (params.gzip) {
        args.push('--gzip');
    }
    if (params.nsFrom) {
        args.push(`--nsFrom=${params.nsFrom}`);
    }
    if (params.nsInclude) {
        args.push(`--nsInclude=${params.nsInclude}`);
    }
    if (params.nsTo) {
        args.push(`--nsTo=${params.nsTo}`);
    }
    return args;
}

export {MongoSpawn, mongoParamsToArgs};